// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="info">
            <p color="green">{message}</p>
        </div>
    )
}
export default Notification