
import { PricingCards } from '@/components/pricing-cards';
import { PricingFaq } from '@/components/pricing-faq';
import { getCurrentUser } from '@/lib/session';
import { getUserSubscriptionPlan } from '@/lib/subscription';
import { stripe } from "@/lib/stripe";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';


export const metadata = {
  title: "Pricing",
}

async function getProducts() {
  const products = await stripe.products.list({
    limit: 100,
    active: true,
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!products) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  const productsNoSub = products.data.filter((obj) => {
    return !obj.description?.toLocaleLowerCase().includes('plan');
  });

  return productsNoSub
}

export default async function PricingPage() {
  const user = await getCurrentUser()
  /*
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
  ]*/
  const products = await getProducts();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <h2 className="sr-only">Products</h2>
        <div className="mx-auto mb-10 flex w-full flex-col gap-5">
        <Link
              href="https://chat.openai.com/g/g-QWziThdPK-hoodie-creator"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "xl" }), "px-8")}
            >
              <Icons.openai className="mr-2 size-4" />
              <p className='text-bold text-lg'>
                <span className="hidden xl:inline-block">GPTs Create with </span>{" "} Hoodie Creator{" "}
              </p>
            </Link>
      </div>

      <h2 className="font-heading text-3xl leading-[1.1] md:text-5xl">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={"/store/" + product.id} className="group">
              <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.images[0]}
                  alt={product.description!}
                  className="size-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              {/*
              <p className="mt-1 text-lg font-medium text-gray-900">{product.default_price?.}</p>
            */}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}