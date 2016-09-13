import List from '../models/List';

function Index(req, res) {
  if (!req.user) { return res.redirect('/auth/google') };
  List.find({ userId: req.user._id }, (err, lists) => {
    if (err) return res.status(500).send('Server problem...');
    res.send(lists);
  });
}

function Update(req, res) {
  List.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, list) => {
      if (err) return res.status(500).send('Problem updating...');
      res.send(list);
    }
  );
}

function Create(req, res) {
  const list = new List({ name: req.body.name, userId: req.user._id });
  list.save(function(err, list) {
    res.send(list);
  });
}

function Delete(req, res) {
  List.findByIdAndRemove(req.params.id, (err, deletedList) => {
    if (err) { return res.status(500).send(); }
    res.status(200).send();
  });
}

export default { Index, Update, Create, Delete };
