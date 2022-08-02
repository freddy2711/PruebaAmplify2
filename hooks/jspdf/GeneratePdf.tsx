import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface Props {
  head: any
  body: any
  name: string
}

const GeneratePdf = ({ head, body, name }: Props) => {
  console.log('head', head)

  const doc = new JsPDF()
  autoTable(doc, {
      head: head,
      body: body,
      didDrawCell: (data) => { },
  });
  const date = new Date()
  doc.save(name)
}

export default GeneratePdf
