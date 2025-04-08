// routes/packages.js
const express = require('express');
const router = express.Router();
const {sql, poolPromise} = require('./db');

// CREATE package
router.post('/', async (req, res) => {
  const { Name, Description, Price, Duration, DestinationID, CategoryID } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.Text, Description)
      .input('Price', sql.Decimal(10, 2), Price)
      .input('Duration', sql.Int, Duration)
      .input('DestinationID', sql.Int, DestinationID)
      .input('CategoryID', sql.Int, CategoryID)
      .query(`
        INSERT INTO Packages (Name, Description, Price, Duration, DestinationID, CategoryID)
        VALUES (@Name, @Description, @Price, @Duration, @DestinationID, @CategoryID)
      `);
    res.send('Package created');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ all packages
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Packages');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ one package
router.get('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Packages WHERE PackageID = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE package
router.put('/:id', async (req, res) => {
  const { Name, Description, Price, Duration, DestinationID, CategoryID } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('Name', sql.VarChar, Name)
      .input('Description', sql.Text, Description)
      .input('Price', sql.Decimal(9, 2), Price)
      .input('Duration', sql.Int, Duration)
      .input('DestinationID', sql.Int, DestinationID)
      .input('CategoryID', sql.Int, CategoryID)
      .query(`
        UPDATE Packages SET
          Name = @Name,
          Description = @Description,
          Price = @Price,
          Duration = @Duration,
          DestinationID = @DestinationID,
          CategoryID = @CategoryID
        WHERE PackageID = @id
      `);
    res.send('Package updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE package
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Packages WHERE PackageID = @id');
    res.send('Package deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;