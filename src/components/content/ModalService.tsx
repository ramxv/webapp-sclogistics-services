import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ModalService = ({ title, description, image, content }: { title: string, description: string, image: string, content: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 >{title}</h1>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="font-bold uppercase text-2xl">{title}</DialogTitle>
          <DialogDescription className="font-principal">{description}</DialogDescription>
        </DialogHeader>
        <div className="relative w-full overflow-hidden rounded-lg
                  aspect-[4/3] sm:aspect-video md:aspect-[3/2]">
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-200"
          />
        </div>
        <p className="font-principal prose">{content}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
