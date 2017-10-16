
/* Here a simple schema is constructed without using the GraphQL query language.
 e.g. using 'new GraphQLObjectType' to create an object type
 */

//const PostType = require('./post-schema');

const Posts = require('../bookdata/posts');
const _ = require('lodash');

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



const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represent an author",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString},
        posts : {
            type : new GraphQLList(require('./post-schema')),
            resolve: function(root, args) {
                return _.filter(Posts, item => root.id.indexOf(item.author_id) > -1 );
            }
        }
    })
});

module.exports = AuthorType;