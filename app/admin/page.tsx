"use client"

import type React from "react"

import { useState } from "react"
import { useApp, type Product } from "../context/app-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Edit, Plus, Save, X } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp()
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      alert("Barcha maydonlarni to'ldiring!")
      return
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image: formData.image,
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
      setEditingProduct(null)
    } else {
      addProduct(productData)
      setIsAddingProduct(false)
    }

    setFormData({ name: "", description: "", price: "", image: "" })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
    })
  }

  const handleCancel = () => {
    setIsAddingProduct(false)
    setEditingProduct(null)
    setFormData({ name: "", description: "", price: "", image: "" })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-xl text-muted-foreground">Mahsulotlarni boshqarish</p>
        </div>

        <Button onClick={() => setIsAddingProduct(true)} disabled={isAddingProduct || editingProduct !== null}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi mahsulot
        </Button>
      </div>

      {(isAddingProduct || editingProduct) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Mahsulot nomi</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Mahsulot nomini kiriting"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Narxi ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Mahsulot tavsifini kiriting"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Rasm</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.image && (
                  <div className="relative h-32 w-32 rounded-md overflow-hidden">
                    <Image src={formData.image || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? "Yangilash" : "Qo'shish"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Bekor qilish
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleEdit(product)}
                  disabled={isAddingProduct || editingProduct !== null}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Tahrirlash
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive bg-transparent"
                      disabled={isAddingProduct || editingProduct !== null}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Mahsulotni o'chirish</DialogTitle>
                      <DialogDescription>
                        "{product.name}" mahsulotini o'chirishni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                      <DialogTrigger asChild>
                        <Button variant="outline">Bekor qilish</Button>
                      </DialogTrigger>
                      <DialogTrigger asChild>
                        <Button variant="destructive" onClick={() => deleteProduct(product.id)}>
                          O'chirish
                        </Button>
                      </DialogTrigger>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Hozircha mahsulotlar yo'q. Birinchi mahsulotni qo'shing!</p>
        </div>
      )}
    </div>
  )
}
