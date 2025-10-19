import sequelize from "../config/database.js";
import UserModel from "./User.js";
import PostModel from "./Post.js";
import PostImageModel from "./PostImage.js";
import CommentModel from "./comment.js";
import TagModel from "./Tag.js";
import FollowerModel from "./Follower.js";

const User = UserModel(sequelize);
const Post = PostModel(sequelize);
const PostImage = PostImageModel(sequelize);
const Comment = CommentModel(sequelize);
const Tag = TagModel(sequelize);
const Follower = FollowerModel(sequelize);

// Asociaciones
User.hasMany(Post, { foreignKey: "author_id", as: "posts" });
Post.belongsTo(User, { foreignKey: "author_id", as: "author" });

Post.hasMany(PostImage, { foreignKey: "post_id", as: "images" });
PostImage.belongsTo(Post, { foreignKey: "post_id" });

Post.hasMany(Comment, { foreignKey: "post_id", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "post_id" });
User.hasMany(Comment, { foreignKey: "author_id", as: "comments" });
Comment.belongsTo(User, { foreignKey: "author_id", as: "author" });

// Tags many-to-many
Post.belongsToMany(Tag, { through: "post_tags", foreignKey: "post_id", otherKey: "tag_id", as: "tags" });
Tag.belongsToMany(Post, { through: "post_tags", foreignKey: "tag_id", otherKey: "post_id", as: "posts" });

// Followers self-relation
User.belongsToMany(User, {
  through: Follower,
  as: "Followers",
  foreignKey: "following_id",
  otherKey: "follower_id",
});
User.belongsToMany(User, {
  through: Follower,
  as: "Following",
  foreignKey: "follower_id",
  otherKey: "following_id",
});

export { sequelize, User, Post, PostImage, Comment, Tag, Follower };
