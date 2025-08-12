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

export const ModalService = ({ title, description, content }: { title: string, description: string, content: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1>{title}</h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <p>{content}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
