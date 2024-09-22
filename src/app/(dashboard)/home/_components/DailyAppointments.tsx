"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format, setHours, setMinutes } from "date-fns";

import styles from "./DailyAppointments.module.css";
import {
  Appointment,
  Appointment as IAppointments,
  Status,
  typeAppointment,
  typeAppointmentDisplay,
} from "@/@types/agendamentos";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader2 } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { AppointmentApi } from "@/services/appointments";
import { FilterAppointment } from "@/@types/agendamentos";
import Loading from "@/components/Loading";
import {
  Patient,
  PatientType,
  PatientTypeDisplay,
  SearchPatient,
} from "@/@types/patient";
import { DailyAppointmentsTable } from "./DailyAppointmentsTable";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ptBR } from "date-fns/locale";
import { ToastAction } from "@/components/ui/toast";
import { generateDayTimeList } from "@/functions/hours";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { patientApi } from "@/services/patient";

export const columns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate.Hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-12 p-0 text-left align-middle font-bold text-sm text-muted-foreground [&:has([role=checkbox])]:pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const hour = row.original.appointmentDate;
      const startTime = hour ? new Date(hour) : new Date(); // Fallback to current date if hour is null
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const formattedStartTime = format(startTime, "kk:mm");
      const formattedEndTime = format(endTime, "kk:mm");

      return (
        <div className="capitalize">
          {formattedStartTime} - {formattedEndTime}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      const patientName = (row.original.Patient as { name?: string })?.name;
      return <div className="capitalize">{patientName || "----"}</div>;
    },
  },
  {
    accessorKey: "Patient.patientType",
    header: "Função",
    cell: ({ row }) => {
      const patientType = (row.original.Patient as { patientType?: string })
        ?.patientType;
      return (
        <div className="capitalize">
          {PatientTypeDisplay[patientType as PatientType] || "----"}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.course",
    header: "Curso",
    cell: ({ row }) => {
      const patientCourse = (row.original.Patient as { course?: string })
        ?.course;
      return <div className="capitalize">{patientCourse || "----"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: " Ações/Status",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          className="bg-secondary-foreground text-white h-6"
        >
          Iniciar
        </Button>
      );
    },
  },
];

export const resChedulingColumns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate.Hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-12 p-0 text-left align-middle font-bold text-sm text-muted-foreground [&:has([role=checkbox])]:pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const hour = row.original.appointmentDate;
      const startTime = hour ? new Date(hour) : new Date(); // Fallback to current date if hour is null
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const formattedStartTime = format(startTime, "kk:mm");
      const formattedEndTime = format(endTime, "kk:mm");

      return (
        <div className="capitalize">
          {formattedStartTime} - {formattedEndTime}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      const patientName = (row.original.Patient as { name?: string })?.name;
      return <div className="capitalize">{patientName || "----"}</div>;
    },
  },
  {
    accessorKey: "Patient.patientType",
    header: "Função",
    cell: ({ row }) => {
      const patientType = (row.original.Patient as { patientType?: string })
        ?.patientType;
      return (
        <div className="capitalize">
          {PatientTypeDisplay[patientType as PatientType] || "----"}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.course",
    header: "Curso",
    cell: ({ row }) => {
      const patientCourse = (row.original.Patient as { course?: string })
        ?.course;
      return <div className="capitalize">{patientCourse || "----"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: " Ações/Status",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          className="bg-secondary-foreground text-white h-6"
        >
          Visualizar
        </Button>
      );
    },
  },
];

export interface IResponse<T> {
  data: T[];
}

export const DailyAppointments = () => {
  const router = useRouter();
  const [dailyAppointmentData, setDailyAppointmentData] = useState<
    IAppointments[]
  >([]);

  // const [patients, setPatients] = useState<Patient[]>([]);
  const [searchPatient, setSearchPatient] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const [patientsOptions, setPatientsOptions] = useState<
    { value: string, label: string }[]>([])

  const [dailyReschedulingData, setDailyReschedulingData] = useState<
    IAppointments[]
  >([]);

  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>();
  const [dayDate, setDayDate] = useState<Date | undefined>();

  const [hour, setHour] = useState<string | undefined>("09:00");
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBookings, setDayBookings] = useState<Appointment[]>([]);

  const [selectedType, setSelectedType] = useState<typeAppointment>();
  const [selectedPatientType, setSelectedPatientType] = useState<PatientType>();
  const [complaint, setComplaint] = useState("");
  const [observation, setObservation] = useState("");

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterAppointment>({
    minDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    maxDate: new Date(new Date().setUTCHours(23, 59, 0, 0)).toISOString(),
    type: typeAppointment.SESSION,
  });

  const fetchPatients = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = await patientApi.fetchPatients(params);
      // setDailyAppointmentData(response.data);
      const patientOptions = response.data.map((patient) => ({
        value: patient?.id +"",
        label: patient?.name,
      }));
      setPatientsOptions(patientOptions);
      // setPatients(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDailyAppointments = async (params: SearchPatient = { limit: 10 }) => {
    try {
      const response = await AppointmentApi.fetchAppointments(params);
      setDailyAppointmentData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchPatients({
        limit: 10,
        name: search
      });
    // }
  }, [search]);

  const fetchDailyRescheduling = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = await AppointmentApi.fetchAppointments(params);
      setDailyReschedulingData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async () => {
    try {
      if (!date || !hour) {
        return;
      }
      setSubmitIsLoading(true);
      // O correto é salvar a data no banco em formato UTC (sem timezone). O primas ja faz isso por padrão.
      // prisma: 2024-06-19T12:00:00.000Z
      // newDate:  Wed Jun 19 2024 09:00:00 GMT-0300 (Horário Padrão de Brasília)

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      // salvar data como .toISOString() com data e hora
      // const newDate = setMinutes(setHours(date, Number(hour.split(":")[0])), Number(hour.split(":")[1]));
      console.log("new Date: ", newDate.toISOString());

      await AppointmentApi.createAppointment({
        appointmentDate: newDate.toISOString(),
        type: selectedType,
        // patientType: selectedPatientType,
        reason: complaint,
        observation,
        patientId: searchPatient,
        status: Status.CONFIRMED,
      });

      await fetchDailyAppointments({
        ...filters,
        status: Status.CONFIRMED,
      });
  
      await fetchDailyRescheduling({
        ...filters,
        status: Status.PENDING,
      });

      setSheetIsOpen(false);
      setDate(undefined);
      setHour(undefined);
      // toast({
      //   title: "Reserva realizada com sucesso!",
      //   description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
      //     locale: ptBR,
      //   }),
      //   action: <ToastAction altText="Visualizar" onClick={() => router.push("###")}>Visualizar</ToastAction>,
      // });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleDayDateClick = (date: Date | undefined) => {
    setDayDate(date);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const AppointmentsTypeOptions = Object.keys(typeAppointmentDisplay).map(
    (key) => ({
      value: key,
      label: typeAppointmentDisplay[key as typeAppointment],
    })
  );

  const PatientTypeOptions = Object.keys(PatientTypeDisplay).map((key) => ({
    value: key,
    label: PatientTypeDisplay[key as PatientType],
  }));

  const onAppointmentsTypeValueChange = async (value: any) => {
    setSelectedType(value);
  };

  const onPatientTypeValueChange = async (value: any) => {
    setSelectedPatientType(value);
  };


  const timeList = useMemo(() => {
    if (!date) return [];

    const newDate = new Date();
    const currentDay = newDate.getDate();
    const selectedDay = date.getDate();

    const currentHour = newDate.getHours();
    const currentMinutes = newDate.getMinutes();

    return generateDayTimeList(date).filter((time) => {
      // time: 09:00
      // se houver algum horário que já foi reservado, ele não deve aparecer na lista
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      // Se for o mesmo dia, verificar se o horário já passou
      if (currentDay === selectedDay) {
        if (
          timeHour < currentHour ||
          (timeHour === currentHour && timeMinutes <= currentMinutes)
        ) {
          return false;
        }
      }

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.appointmentDate
          ? new Date(booking.appointmentDate).getHours()
          : 0; // Default to 0 if null
        const bookingMinutes = booking.appointmentDate
          ? new Date(booking.appointmentDate).getMinutes()
          : 0; // Default to 0 if null

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) return true;

      return false;
    });
  }, [date, dayBookings]);

  useEffect(() => {
    fetchDailyAppointments({
      ...filters,
      status: Status.CONFIRMED,
    });

    fetchDailyRescheduling({
      ...filters,
      status: Status.PENDING,
    });
  }, [filters]);

  useEffect(() => {
    if (!date) return;
    const refreshAvailableHours = async () => {
      const dayBookingsResponse = await AppointmentApi.fetchAppointments({
        minDate: new Date(date.setUTCHours(0, 0, 0, 0)).toISOString(),
        maxDate: new Date(date.setUTCHours(23, 59, 0, 0)).toISOString(),
        type: typeAppointment.SESSION,
        status: Status.CONFIRMED,
      });
      setDayBookings(dayBookingsResponse.data);
    };
    refreshAvailableHours();
  }, [date]);

  useEffect(() => {
    if (!dayDate) return;
    const refreshAvailableDayHours = async () => {
      const dayBookingsResponse = await AppointmentApi.fetchAppointments({
        minDate: new Date(dayDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        maxDate: new Date(dayDate.setUTCHours(23, 59, 0, 0)).toISOString(),
        type: typeAppointment.SESSION,
        status: Status.CONFIRMED,
      });

      const dayReschedulingResponse = await AppointmentApi.fetchAppointments({
        minDate: new Date(dayDate.setUTCHours(0, 0, 0, 0)).toISOString(),
        maxDate: new Date(dayDate.setUTCHours(23, 59, 0, 0)).toISOString(),
        type: typeAppointment.SESSION,
        status: Status.PENDING,
      });
      setDailyAppointmentData(dayBookingsResponse.data);
      setDailyReschedulingData(dayReschedulingResponse.data);
    };
    refreshAvailableDayHours();
  }, [dayDate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-1 flex-col gap-5">
        <div>
          <h1 className="text-[#159A9C] text-[25px] font-semibold mb-1">
            Sessões do dia
          </h1>
          <div className={styles.container}>
            <div className="">
              {dailyAppointmentData ? (
                <DailyAppointmentsTable
                  data={dailyAppointmentData}
                  columns={columns}
                  hiddenColumns={{
                    phoneNumber: false,
                    address: false,
                    createdAt: false,
                    updatedAt: false,
                  }}
                />
              ) : (
                "loading"
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-[#159A9C] text-[25px] font-semibold mb-1">
            Reagendamentos
          </h1>
          <div className={styles.container}>
            <div className="">
              {dailyReschedulingData ? (
                <DailyAppointmentsTable
                  data={dailyReschedulingData}
                  columns={resChedulingColumns}
                  hiddenColumns={{
                    phoneNumber: false,
                    address: false,
                    createdAt: false,
                    updatedAt: false,
                  }}
                />
              ) : (
                "loading"
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="py-6 w-[400px]">
          <Calendar
            mode="single"
            selected={dayDate}
            onSelect={handleDayDateClick}
            locale={ptBR}
            styles={{
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "80px",
                height: "32px",
              },
              nav_button_next: {
                width: "80px",
                height: "32px",
              },
              caption: {
                textTransform: "capitalize",
              },
            }}
          />
        </div>
        <div className="ml-auto">
          <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="bg-secondary-foreground text-white"
                size="lg"
              >
                Agendar horário
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0 overflow-auto">
              <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                <SheetTitle>Agendar</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateClick}
                  locale={ptBR}
                  fromDate={new Date()}
                  styles={{
                    head_cell: {
                      width: "100%",
                      textTransform: "capitalize",
                    },
                    cell: {
                      width: "100%",
                    },
                    button: {
                      width: "100%",
                    },
                    nav_button_previous: {
                      width: "32px",
                      height: "32px",
                    },
                    nav_button_next: {
                      width: "32px",
                      height: "32px",
                    },
                    caption: {
                      textTransform: "capitalize",
                    },
                  }}
                />
              </div>

              {/* Mostrar lista de horários apenas se alguma data estiver selecionada */}
              {date && (
                <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                  {timeList.map((time) => (
                    <Button
                      onClick={() => handleHourClick(time)}
                      variant={hour === time ? "default" : "outline"}
                      className="rounded-full"
                      key={time}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}

              <div className="py-6 px-5 border-t border-solid border-secondary flex flex-col gap-4">
                {/* <BookingInfo
                      booking={{
                        barbershop: barbershop,
                        service: service,
                        date:
                          date && hour
                            ? setMinutes(
                                setHours(date, Number(hour.split(":")[0])),
                                Number(hour.split(":")[1])
                              )
                            : undefined,
                      }}
                    /> */}
                <div className="flex gap-4">
                  <Select
                    onValueChange={(value) =>
                      onAppointmentsTypeValueChange(value)
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {AppointmentsTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) => onPatientTypeValueChange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Função" />
                    </SelectTrigger>
                    <SelectContent>
                      {PatientTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  className="border-secondary border-[2px] h-28"
                  placeholder="Queixa"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                />
                <Textarea
                  className="border-secondary border-[2px] h-28"
                  placeholder="Observação"
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                />
              </div>

              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {searchPatient
                        ? patientsOptions.find(
                            (patient) => patient.value === searchPatient
                          )?.label
                        : "Selecionar Paciente..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput onValueChange={(value) =>{
                        setSearch(value);
                      }}  placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No Paciente found.</CommandEmpty>
                        <CommandGroup>
                          {patientsOptions.map((patient) => (
                            <CommandItem
                              key={patient.value}
                              value={patient.value}
                              onSelect={(currentValue) => {
                                setSearchPatient(
                                  currentValue === searchPatient
                                    ? ""
                                    : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  searchPatient === patient.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {patient.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <SheetFooter className="px-5">
                <Button
                  onClick={handleBookingSubmit}
                  disabled={!hour || !date || submitIsLoading}
                >
                  {submitIsLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirmar reserva
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
