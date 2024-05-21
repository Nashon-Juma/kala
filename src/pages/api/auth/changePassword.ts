import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request!" })

    try {
        connectToDB()

        const { compare: passwordToCompare, password, _id } = req.body
        const userData = await UserModel.findOne({ _id })

        console.log(passwordToCompare, password)

        if (!userData) return res.status(401).json({ message: 'کاربری با این نام کاربری/ایمیل یافت نشد' })

        if (passwordToCompare) {
            if (! await compare(passwordToCompare, userData.password)) {
                return res.status(401).json({ message: 'رمز عبور وارد شده صحیح نیست' })
            } else {
                return res.status(200).json({ message: 'رمز عبور صحیح است' })
            }
        }

        const hashedPassword = await hash(password, 12)

        await UserModel.findOneAndUpdate({ _id }, { password: hashedPassword })

        return res.status(200).json({ message: 'رمز عبور با موفقیت تغییر یافت(:' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;