export const LogoutButton = ({resetUser, resetToken})=>{
    const handleReset = () => {
        resetUser(null)
        resetToken(null)
    }

    return (
        <>
        <button onClick={()=>{handleReset(resetUser(), resetToken())}}>Log Out</button>
        </>
    )
}