import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './mongodb';  // เชื่อมต่อกับฐานข้อมูล

export default async function handler(req, res) {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    const { db } = await connectToDatabase();

    // เช็คว่า method เป็น POST หรือไม่
    if (req.method === 'POST') {
      const { token, newPassword } = req.body;

      // ตรวจสอบว่า token และรหัสผ่านใหม่ถูกต้องหรือไม่
      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required.' });
      }

      // ค้นหาผู้ใช้จาก token
      const user = await db.collection('user').findOne({ resetToken: token });
      if (!user) {
        return res.status(404).json({ error: 'Invalid or expired token.' });
      }

      // ตรวจสอบว่า token หมดอายุหรือไม่
      const tokenExpiry = new Date(user.resetTokenExpiry);
      if (tokenExpiry < new Date()) {
        return res.status(400).json({ error: 'Token has expired.' });
      }

      // แฮชรหัสผ่านใหม่
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // อัพเดตข้อมูลรหัสผ่านในฐานข้อมูล
      const result = await db.collection('user').updateOne(
        { resetToken: token },
        {
          $set: {
            password: hashedPassword,
            resetToken: null,  // ลบ token หลังจากใช้งานแล้ว
            resetTokenExpiry: null,  // ลบ expiry date
          },
        }
      );

      // หากอัพเดตรหัสผ่านไม่ได้
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'User not found or password not updated.' });
      }

      return res.status(200).json({ message: 'Password updated successfully' });
    } else {
      // หาก method ไม่ใช่ POST
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
