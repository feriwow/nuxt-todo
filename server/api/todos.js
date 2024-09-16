import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const method = event.method;

    switch (method) {
        case "GET":
            return await prisma.todo.findMany({
                orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
            });
        case "POST":
            const body = await readBody(event);
            return await prisma.todo.create({ data: body });
        case "PUT":
            const updateData = await readBody(event);
            const { id, ...data } = updateData;
            return await prisma.todo.update({ where: { id }, data });
        case "DELETE":
            const deleteData = await readBody(event);
            return await prisma.todo.delete({ where: { id: deleteData.id } });
        default:
            return { error: "Method not allowed" };
    }
});
