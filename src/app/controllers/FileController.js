import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { url, id } = await File.create({ name, path });

    return res.json({ url, id, name, path });
  }
}

export default new FileController();
