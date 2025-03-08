import { useParams } from "react-router";

export function UsersPage() {
    let { usuarioId } = useParams();

    return (
        <div>
            <h1>Página do Usuário</h1>
            <p>ID do Usuário: {usuarioId}</p>
        </div>
    )
}