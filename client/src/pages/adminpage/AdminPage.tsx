import { Navigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"

export const AdminPage = () => {

    const {user} = useAuth()

    if (!user) {
        console.log('====================================');
        console.log('no user');
        console.log('====================================');
        return <Navigate to='/'/>
    } else if (!user.is_admin) {
            return <Navigate to='/'/>
    } else  return (
        <h1>Admin Page</h1>
    )
}