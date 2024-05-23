export const LogoutButton = ({resetUser, resetToken})=>{
    const handleReset = () => {
        resetUser(null)
        resetToken(null)
    }

    return (
        <>
        <button onClick={()=>handleReset()}>Log Out</button>
        </>
    )
}