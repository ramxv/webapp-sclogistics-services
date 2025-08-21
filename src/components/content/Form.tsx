import { actions } from "astro:actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useFormInput } from "./hooks/useFormInput";

export const Form = () => {
  const name = useFormInput('');
  const gmail = useFormInput('');
  const description = useFormInput('');

  const data = {
    completeName: name.value,
    email: gmail.value,
    description: description.value
  }


  return (
    <>
      <form action={actions.send} method="POST" className="flex flex-col gap-4" >
        <Label htmlFor="completeName">Nombre Completo</Label>
        <Input placeholder="e.g. Nombre Appellido" id="completeName" type="text" name="completeName" value={data.completeName} onChange={name.onChange} />
        <Label htmlFor="gmail">Correo Electrónico</Label>
        <Input placeholder="e.g. micorreo@gmail.com" id="gmail" type="email" name="gmail" value={data.email} onChange={gmail.onChange} />

        <Label htmlFor="description">Mensaje</Label>
        <Textarea id="description" name="description" value={data.description} onChange={description.onChange} />

        <Button type="submit" size={"lg"} className="font-principal hover:cursor-pointer hover:bg-secondary/85 bg-secondary text-black">Enviar</Button>
      </form>
    </>
  );
};

