'use server'

import { checkAdmin } from "./admin"
import { updateUserPoints } from "@/lib/db/queries"
import { revalidatePath } from "next/cache"

export async function saveUserPoints(userId: string, points: number) {
    await checkAdmin()
    await updateUserPoints(userId, points)
    revalidatePath('/admin/users')
}
