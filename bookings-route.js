// routes/bookings.js
const express = require('express');
const router = express.Router();
const {sql, poolPromise} = require('./db');

// CREATE booking
router.post('/', async (req, res) => {
  const { UserID, PackageID, BookingDate, Status, TotalPrice } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('UserID', sql.Int, UserID)
      .input('PackageID', sql.Int, PackageID)
      .input('BookingDate', sql.Date, BookingDate)
      .input('Status', sql.VarChar, Status)
      .input('TotalPrice', sql.Decimal(10, 2), TotalPrice)
      .query(`
        INSERT INTO Bookings (UserID, PackageID, BookingDate, Status, TotalPrice)
        VALUES (@UserID, @PackageID, @BookingDate, @Status, @TotalPrice)
      `);
    res.send('Booking created');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ all bookings
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Bookings');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ one booking
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Bookings WHERE BookingID = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE booking
router.put('/:id', async (req, res) => {
  const { UserID, PackageID, BookingDate, Status, TotalPrice } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('UserID', sql.Int, UserID)
      .input('PackageID', sql.Int, PackageID)
      .input('BookingDate', sql.Date, BookingDate)
      .input('Status', sql.VarChar, Status)
      .input('TotalPrice', sql.Decimal(10, 2), TotalPrice)
      .query(`
        UPDATE Bookings SET
          UserID = @UserID,
          PackageID = @PackageID,
          BookingDate = @BookingDate,
          Status = @Status,
          TotalPrice = @TotalPrice
        WHERE BookingID = @id
      `);
    res.send('Booking updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Bookings WHERE BookingID = @id');
    res.send('Booking deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;