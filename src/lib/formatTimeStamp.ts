function convertTimestampToDate(timestamp: string | number | Date) {
  // Converte o timestamp para milissegundos, criando um novo objeto Date
  const date = new Date(timestamp)

  // Obtém os componentes da data legível
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Mês começa do 0, então adicionamos +1
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // Retorna a data no formato "DD/MM/YYYY HH:mm:ss"
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

export default convertTimestampToDate
