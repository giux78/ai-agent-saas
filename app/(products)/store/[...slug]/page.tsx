import { notFound } from "next/navigation"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { env } from "@/env.mjs"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import Balancer from "react-wrap-balancer"
import { stripe } from "@/lib/stripe";
import { useState } from "react"

const colors =  [
  { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
  { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]

const sizes = [
  { name: 'XXS', inStock: false },
  { name: 'XS', inStock: true },
  { name: 'S', inStock: true },
  { name: 'M', inStock: true },
  { name: 'L', inStock: true },
  { name: 'XL', inStock: true },
  { name: '2XL', inStock: true },
  { name: '3XL', inStock: true },
]


export default async function PostPage({ params }: { params: { slug: string } }) {
  //const [selectedColor, setSelectedColor] = useState(colors[0])
  //const [selectedSize, setSelectedSize] = useState(sizes[2])
  console.log(params);

  const slug = params.slug[0]

  const product = await stripe.products.retrieve(
    slug
  );

  if (!product) {
    notFound()
  }
  
  const price = await stripe.prices.retrieve(product.default_price!.toString())
 

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/store"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 size-4" />
        See all product
      </Link>
      <div>
        {product.created && (
          <time
            dateTime={product.created.toLocaleString()}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(product.created)}
          </time>
        )}
      </div>

      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3  overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0]}
              alt={product.description!}
              className="size-full object-cover object-center"
            />
          </div>

          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-5 lg:aspect-w-4 sm:rounded-lg">
            <img
              src={product.images[1]}
              alt={product.description!}
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{(price.unit_amount! / 100) + "0"}</p>

            

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
{/*
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                          </RadioGroup> */}
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.metadata.color}</p>
              </div>

              {/* Sizes */}
              <div className="mt-4 space-y-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.metadata.size}</p>
              </div>

            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.metadata.prompt}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>








      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/store" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 size-4" />
          See all products
        </Link>
      </div>
    </article>
  )
}
