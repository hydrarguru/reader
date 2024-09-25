import { Button } from "@/components/ui/button"

interface IconButtonProps {
    icon: React.ReactNode
}

export function IconButton({ icon }: IconButtonProps) {
  return (
    <Button variant="outline" size="icon">
      {icon}
    </Button>
  )
}