import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import styles from "./Patient.module.css";
import { PatientType, PatientTypeDisplay } from "@/@types/patient";

interface User {
  serie: any;
  numberSessions: any;
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  course: string;
  registration: string;
  gender: string;
  patientType: PatientType;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
}

// interface Response {
//   count: number;
//   data: User[];
// }

// const responseMock: Response = {
//   count: 10,
//   data: [
//     {
//       id: 25,
//       name: "José Oliveira",
//       email: "jose.oliveira@example.com",
//       age: 33,
//       phone: "+55 11 91234-5702",
//       course: "ADMINISTRACAO",
//       registration: "20211025",
//       gender: "MALE",
//       patientType: "GUARDIAN",
//       createdAt: "2023-09-25T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 24,
//       name: "Mariana Farias",
//       email: "mariana.farias@example.com",
//       age: 26,
//       phone: "+55 11 91234-5701",
//       course: "QUIMICA",
//       registration: "20211024",
//       gender: "FEMALE",
//       patientType: "CONTRACTOR",
//       createdAt: "2023-09-24T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 23,
//       name: "Daniel Ramos",
//       email: "daniel.ramos@example.com",
//       age: 31,
//       phone: "+55 11 91234-5700",
//       course: "FISICA",
//       registration: "20211023",
//       gender: "MALE",
//       patientType: "TEACHER",
//       createdAt: "2023-09-23T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 22,
//       name: "Patricia Araújo",
//       email: "patricia.araujo@example.com",
//       age: 27,
//       phone: "+55 11 91234-5699",
//       course: "ADS",
//       registration: "20211022",
//       gender: "FEMALE",
//       patientType: "STUDENT",
//       createdAt: "2023-09-22T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 21,
//       name: "Eduardo Santos",
//       email: "eduardo.santos@example.com",
//       age: 21,
//       phone: "+55 11 91234-5698",
//       course: "ELETROTECNICA",
//       registration: "20211021",
//       gender: "MALE",
//       patientType: "GUARDIAN",
//       createdAt: "2023-09-21T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 20,
//       name: "Vanessa Pinto",
//       email: "vanessa.pinto@example.com",
//       age: 30,
//       phone: "+55 11 91234-5697",
//       course: "INFORMATICA",
//       registration: "20211020",
//       gender: "FEMALE",
//       patientType: "CONTRACTOR",
//       createdAt: "2023-09-20T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 19,
//       name: "Rodrigo Lopes",
//       email: "rodrigo.lopes@example.com",
//       age: 34,
//       phone: "+55 11 91234-5696",
//       course: "ADMINISTRACAO",
//       registration: "20211019",
//       gender: "MALE",
//       patientType: "TEACHER",
//       createdAt: "2023-09-19T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 18,
//       name: "Larissa Silva",
//       email: "larissa.silva@example.com",
//       age: 25,
//       phone: "+55 11 91234-5695",
//       course: "ELETROTECNICA",
//       registration: "20211018",
//       gender: "FEMALE",
//       patientType: "STUDENT",
//       createdAt: "2023-09-18T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 17,
//       name: "Thiago Costa",
//       email: "thiago.costa@example.com",
//       age: 27,
//       phone: "+55 11 91234-5694",
//       course: "QUIMICA",
//       registration: "20211017",
//       gender: "MALE",
//       patientType: "CONTRACTOR",
//       createdAt: "2023-09-17T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//     {
//       id: 16,
//       name: "Renata Melo",
//       email: "renata.melo@example.com",
//       age: 29,
//       phone: "+55 11 91234-5693",
//       course: "FISICA",
//       registration: "20211016",
//       gender: "FEMALE",
//       patientType: "TEACHER",
//       createdAt: "2023-09-16T08:00:00.000Z",
//       updatedAt: null,
//       isActive: true,
//     },
//   ],
// };

interface PatientProps {
    data: User[];
    count: number;
}

export const Patient = ({data, count}: PatientProps) => {
  return (
    <div className={styles.container}>
      <Table className="bg-white rounded-lg">
        {/* <TableCaption>A list of your recent patients.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* className="w-[100px]" */}
            <TableHead>Nome</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Função</TableHead>
            {/* <TableHead className="text-right">Curso</TableHead> */}
            <TableHead>Curso</TableHead>
            <TableHead>Série/Módulo</TableHead>
            <TableHead>Sessões</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: User, index) => {
            return (
              <TableRow key={item.id} style={{}} className={`${(index + 1) % 2 == 0 ? 'bg-[#EFF1F3]' : ''}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.registration}</TableCell>
                <TableCell>{PatientTypeDisplay[item.patientType]}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item?.serie ? item?.serie : "---"}</TableCell>
                <TableCell>{item?.numberSessions ? item?.numberSessions : "---"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
