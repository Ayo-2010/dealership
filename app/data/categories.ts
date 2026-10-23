import dealership from '~/config/dealership'

export interface VehicleCategory {
  label: string
  description: string
  href: string
  image: string
  cta: string
}

/**
 * Image-led category links. Every destination is a real, working inventory
 * filter rather than an empty landing page.
 */
export const vehicleCategories: VehicleCategory[] = [
  {
    label: 'SUVs',
    description: 'Space, presence and all-road confidence.',
    href: '/cars?bodyType=SUV',
    image: '/images/categories/suv.jpg',
    cta: 'Explore SUVs',
  },
  {
    label: 'Sedans',
    description: 'Composed comfort for every journey.',
    href: '/cars?bodyType=Sedan',
    image: '/images/categories/sedan.jpg',
    cta: 'Explore sedans',
  },
  {
    label: 'Coupes',
    description: 'Low-slung design with a driver focus.',
    href: '/cars?bodyType=Coupe',
    image: '/images/categories/coupe.jpg',
    cta: 'Explore coupes',
  },
  {
    label: 'Hatchbacks',
    description: 'Compact, practical and easy to place.',
    href: '/cars?bodyType=Hatchback',
    image: '/images/categories/hatchback.jpg',
    cta: 'Explore hatchbacks',
  },
  {
    label: 'Pickup trucks',
    description: 'Built for work without losing presence.',
    href: '/cars?bodyType=Pickup',
    image: '/images/categories/pickup.jpg',
    cta: 'Explore pickups',
  },
  {
    label: 'Luxury',
    description: 'The collection’s highest-specification vehicles.',
    href: `/cars?minPrice=${dealership.luxuryPriceThreshold}`,
    image: '/images/categories/luxury.jpg',
    cta: 'Explore luxury',
  },
]
