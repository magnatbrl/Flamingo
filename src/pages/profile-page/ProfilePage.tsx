
import { useAuth } from '../../hooks/useAuth'

export default function ProfilePage() {

  const { user } = useAuth();

  if (user) {
    return (
      <div>ProfilePage
        <h2>{user.firstName}</h2>
        <p>{user.email}</p>
        <p>{user.tel}</p>
      </div>
    )
  }

  return <p>Loading</p>

}
