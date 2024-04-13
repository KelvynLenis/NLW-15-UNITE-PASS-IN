import 'dayjs/locale/pt-br'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { IconButton } from './Icon-button'
import { Table } from './table/Table'
import { TableHeader } from './table/Table-header'
import { TableCell } from './table/Table-cell'
import { TableRow } from './table/Table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export function AttendeeList() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length / 10)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participants</h1>

        <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3" >
          <Search className='size-4 text-emerald-300' />
          <input onChange={onSearchInputChanged} value={search} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" type="text" placeholder="Buscar participante..." />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow> 
            <TableHeader style={{ width: 64 }}>
              <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400' name="" id="" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {
            attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
              <tr key={attendee.id} className='border-b border-white/10 hover:bg-white/5'>
                <TableCell>
                  <input type="checkbox" className='size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400' name="" id="" />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-white'>{attendee.name}</span>
                    <span>{attendee.email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
                <TableCell>
                  
                  <IconButton transparent>
                    <MoreHorizontal size={16} />
                  </IconButton>
                </TableCell>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell className='text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
                <span>Página {page} de {totalPages}</span>

                <div className='flex gap-1.5'>
                  <IconButton disabled={page === 1} onClick={goToFirstPage}>
                    <ChevronsLeft size={16} />
                  </IconButton>
                  <IconButton disabled={page === 1} onClick={goToPreviousPage}>
                    <ChevronLeft size={16} />
                  </IconButton>
                  <IconButton disabled={page === totalPages} onClick={goToNextPage}>
                    <ChevronRight size={16} />
                  </IconButton>
                  <IconButton disabled={page === totalPages} onClick={goToLastPage}>
                    <ChevronsRight size={16} />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}

