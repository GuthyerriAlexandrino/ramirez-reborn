export type UserPhotographer = {
  _id: {
    $oid: string
  }
  name: string
  city: string
  state: string
  bio: string
  specialization: string[]
  profile_img: string
  services_price: number[]
  views: number
}
