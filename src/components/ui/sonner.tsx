import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      className="toaster group"
    />
  )
}

export { Toaster }
