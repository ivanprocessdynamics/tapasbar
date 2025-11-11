"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar as CalendarIcon, Clock, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { showSuccess } from "@/utils/toast"
import { useScrollAnimate } from "@/hooks/useScrollAnimate"

const reservationSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  people: z.string({ required_error: "Debes seleccionar el número de personas." }),
  date: z.date({ required_error: "Debes seleccionar una fecha." }),
  time: z.string({ required_error: "Debes seleccionar una hora." }),
});

export const Reservations = () => {
  const { ref, isInView } = useScrollAnimate<HTMLElement>({ triggerOnce: true });
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: "" },
  });

  function onSubmit(values: z.infer<typeof reservationSchema>) {
    console.log(values);
    showSuccess(`¡Reserva confirmada para ${values.name}! Te esperamos.`);
    form.reset();
  }

  return (
    <section id="reservas" ref={ref} className="w-full py-16 md:py-24 bg-secondary overflow-x-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className={cn("space-y-6 opacity-0", isInView && "animate-slide-in-from-left")}>
          <h2 className="text-3xl md:text-4xl font-bold">Reserva y Contacto</h2>
          <p className="text-muted-foreground text-lg">
            ¿Quieres asegurarte un sitio? Rellena el formulario o llámanos. ¡Estamos deseando verte!
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Dirección</h3>
                <p className="text-muted-foreground">Calle de las Tapas, 42, 28004 Madrid</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p className="text-muted-foreground">+34 910 123 456</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Horario</h3>
                <p className="text-muted-foreground">Martes a Domingo: 12:00 - 00:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("bg-background p-8 rounded-lg shadow-lg opacity-0", isInView && "animate-slide-in-from-right")} style={{ animationDelay: '150ms' }}>
          <h3 className="text-2xl font-bold mb-6 text-center">Reserva tu mesa</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField control={form.control} name="people" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personas</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Nº" /></SelectTrigger></FormControl>
                      <SelectContent>{[...Array(8)].map((_, i) => <SelectItem key={i+1} value={String(i+1)}>{i+1}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Fecha</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Elige fecha</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus /></PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Hora" /></SelectTrigger></FormControl>
                      <SelectContent>{['13:00', '14:00', '15:00', '20:00', '21:00', '22:00'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <Button type="submit" className="w-full">Confirmar Reserva</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};