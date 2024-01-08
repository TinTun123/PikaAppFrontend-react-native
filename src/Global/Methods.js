export const handleChange = (field, value, setData) => {
  setData(pre => ({ ...pre, [field]: value }))
}