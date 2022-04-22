rs.initiate({
  _id: "rsg3",
  version: 1,
  members: [
    { _id: 0, host : "mongo:27017" }
  ]
});
cfg = rs.conf();
cfg.members[0].priority = 1;
rs.reconfig(cfg);