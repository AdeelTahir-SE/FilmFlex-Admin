import connection from "@/DB/connectDB"; // Adjust the path to your DB connection
import bcrypt from 'bcryptjs'; // To compare passwords

// GET handler
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const userId = searchParams.get('userId');

  try {
    if (!type || !userId) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 });
    }

    if (type === 'account') {
      const [results] = await queryDB('SELECT name, email, status FROM admin WHERE id = ?', [userId]);
      if (results.length === 0) {
        return Response.json({ error: 'Admin not found' }, { status: 404 });
      }
      return Response.json(results[0]);
    } else if (type === 'notifications') {
      const [results] = await queryDB('SELECT notifications_enabled FROM admin WHERE id = ?', [userId]);
      if (results.length === 0) {
        return Response.json({ error: 'Admin not found' }, { status: 404 });
      }
      return Response.json(results[0]);
    }
    return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}

// PUT handler
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const body = await req.json();

  try {
    if (!type) {
      return Response.json({ error: 'Missing type parameter' }, { status: 400 });
    }

    if (type === 'account') {
      // Update name based on email
      const { name, email } = body;
      if (!name || !email) {
        return Response.json({ error: 'Missing name or email' }, { status: 400 });
      }
      await queryDB('UPDATE admin SET name = ? WHERE email = ?', [name, email]);
      return Response.json({ message: 'Name updated successfully based on email' });
    } else if (type === 'security') {
      // Update password after verifying current password
      const { currentPassword, newPassword, email } = body;
      if (!currentPassword || !newPassword || !email) {
        return Response.json({ error: 'Missing currentPassword, newPassword, or email' }, { status: 400 });
      }

      const [results] = await queryDB('SELECT password FROM admin WHERE email = ?', [email]);

      if (results.length === 0) {
        return Response.json({ error: 'Admin not found' }, { status: 404 });
      }

      const dbPassword = results[0]?.password;
      const isMatch = await bcrypt.compare(currentPassword, dbPassword);
      if (isMatch) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await queryDB('UPDATE admin SET password = ? WHERE email = ?', [hashedNewPassword, email]);
        return Response.json({ message: 'Password updated successfully' });
      } else {
        return Response.json({ error: 'Incorrect current password' }, { status: 400 });
      }
    } else if (type === 'notifications') {
      // Update notification preferences
      const { notificationsEnabled, email } = body;
      if (notificationsEnabled === undefined || !email) {
        return Response.json({ error: 'Missing notificationsEnabled or email' }, { status: 400 });
      }
      await queryDB('UPDATE admin SET notifications_enabled = ? WHERE email = ?', [notificationsEnabled, email]);
      return Response.json({ message: 'Notification preferences updated successfully' });
    }

    return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Database error', details: error.message }, { status: 500 });
  }
}

// Helper function to promisify database queries
function queryDB(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}
