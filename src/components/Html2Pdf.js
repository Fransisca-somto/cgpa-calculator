import React from 'react'

const Html2Pdfs = () => {
    const element = document.getElementById("table-to-pdf");
  html2pdf().from(element).save("table.pdf");
  return (
    <div></div>
  )
}

export default Html2Pdfs