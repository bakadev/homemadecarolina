import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";
type Props = {
  images: (GalleryImage & { category: string })[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};
export function Lightbox(_props: Props) {
  return null;
}
