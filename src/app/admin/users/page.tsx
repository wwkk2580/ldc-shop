import { getUsers } from "@/lib/db/queries"
import { UsersContent } from "@/components/admin/users-content"
import { checkAdmin } from "@/actions/admin"

export default async function UsersPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
    await checkAdmin()

    const page = Number(searchParams.page) || 1
    const q = searchParams.q || ''
    const pageSize = 20

    const data = await getUsers(page, pageSize, q)

    return <UsersContent data={data} />
}
