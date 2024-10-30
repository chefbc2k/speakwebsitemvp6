import {
  Upload,
  Save,
  Loader2,
  // Add any other icons you need
} from "lucide-react"

export const Icons = {
  upload: Upload,
  save: Save,
  spinner: Loader2,
  // Map additional icons here
}

export type IconKeys = keyof typeof Icons 