const _ = require('lodash');

//Authors and Posts get data from JSON Arrays in the respective files.
const Authors = require('../bookdata/authors');
const Posts = require('../bookdata/posts');

const AuthorType = require('./author-schema');

const PostType = require('./post-schema');


/* Here a simple schema is constructed without using the GraphQL query language.
 e.g. using 'new GraphQLObjectType' to create an object type
 */

let {
    // These are the basic GraphQL types need in this tutorial
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    // This is used to create required fileds and arguments
    GraphQLNonNull,
    // This is the class we need to create the schema
    GraphQLSchema,
    } = require('graphql');



// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            args:{
                id :{type:new GraphQLList(GraphQLString)}
            },
            resolve: function(root,args) {
                return args.id
                    ? _.filter(Authors, item => args.id.indexOf(item.id) > -1 )
                    : Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            args:{
                id :{type:new GraphQLList(GraphQLString)}
            },
            resolve: function(root, args) {
                return args.id
                    ? _.filter(Posts, item => args.id.indexOf(item.id) > -1 )
                    : Posts
            }
        },
        post: {
            type: PostType,
            description: "Get Post Details",
            args: {
                id: { type: GraphQLString }
            },
            resolve: (root, args) => {
                return _.find(Posts, positem => positem.id == args.id);
            }
        },
        author: {
            type: AuthorType,
            description: "Get Author Details",
            args: {
                id: { type: GraphQLString }
            },
            resolve: (root, args) => {
                return _.find(Authors, authortem => authortem.id == args.id);
            }
        }
    })
});

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
    // If you need to create or updata a datasource,
    // you use mutations. Note:
    // mutations will not be explored in this post.
    // mutation: BlogMutationRootType
});

module.exports = BlogAppSchema;