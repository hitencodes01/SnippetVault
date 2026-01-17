import Resource from "../models/Resource.js";

export async function createResource(req, res) {
  try {
    const { title, description, link, category, tags } = req.body;
    const resource = await Resource.create({
      title,
      description,
      link,
      category,
      tags,
      owner: req.user._id,
    });
    res.status(201).json(resource);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid Data" });
  }
}

export async function getResources(req, res) {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const resources = await Resource.find(filter)
    .populate("owner", "name")
    .sort({ createdAt: -1 });
  res.json(resources);
}

export async function deleteResource(req, res) {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    if (resource.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await resource.deleteOne();
    res.json({ message: "Resource removed" });
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
}

export async function toggleVote(req, res) {
  try {
    const resource = await Resource.findById(req.params.id);
    const userId = req.user._id;
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const isVoted = resource.votes.includes(userId);
    if (isVoted) {
      resource.votes = resource.votes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      resource.votes.push(userId);
    }
    await resource.save();
    res.json({ votes: resource.votes.length, hasVoted: !isVoted });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
