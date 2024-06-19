import { Box } from "@mui/material"
import GiratoryCard from "../../components/GiratoryCard/GiratoryCard"
import { LoginBox } from "../../components/LoginBox"
import { ChangePasswordBox } from "../../components/ChangePasswordBox"
import { useState } from "react"

const LoginPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <GiratoryCard isFlipped={isFlipped} frontComponent = {<LoginBox setIsFlipped={setIsFlipped} />} backComponent = {<ChangePasswordBox />} />
    </Box>
  )
}

export default LoginPage