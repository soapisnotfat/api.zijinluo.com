import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

const Info = new GraphQLObjectType({
  name: 'personal_information',
  fields: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    preferredName: { type: GraphQLString },
    location: { type: GraphQLString },
    position: { type: GraphQLString },
    pastLocations: { type: new GraphQLList(GraphQLString) },

    phone: { type: GraphQLString },
    school_email: { type: GraphQLString },
    personal_email: { type: GraphQLString },
    official_email: { type: GraphQLString },
    primary_email: { type: GraphQLString },

    website_url: { type: GraphQLString },
    github_url: { type: GraphQLString },
    blog_url: { type: GraphQLString },

    resume_download_url: { type: GraphQLString },
    cv_download_url: { type: GraphQLString }
  }
});

const People = new GraphQLObjectType({
  name: 'known_people',
  fields: {
    names: { type: new GraphQLList(GraphQLString) },
    me: { type: GraphQLBoolean },
    link: { type: GraphQLString }
  }
});

const Education = new GraphQLObjectType({
  name: 'education',
  fields: {
    name: { type: GraphQLString },
    study: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    isCurrent: { type: GraphQLBoolean },
    notes: { type: new GraphQLList(GraphQLString) },
    featured: { type: GraphQLBoolean },
    archived: { type: GraphQLBoolean }
  }
});

const CourseWork = new GraphQLObjectType({
  name: 'coursework',
  fields: {
    name: { type: GraphQLString },
    items: { type: new GraphQLList(GraphQLString) }
  }
});

const Experience = new GraphQLObjectType({
  name: 'experience',
  fields: {
    title: { type: GraphQLString },
    company: { type: GraphQLString },
    companyLink: { type: GraphQLString },
    location: { type: GraphQLString },
    skills: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    notes: { type: new GraphQLList(GraphQLString) },
    featured: { type: GraphQLBoolean },
    archived: { type: GraphQLBoolean }
  }
});

const Link = new GraphQLObjectType({
  name: 'links',
  fields: {
    PDF: { type: GraphQLString },
    AAAI: { type: GraphQLString },
    Arxiv: { type: GraphQLString }
  }
});

const Publication = new GraphQLObjectType({
  name: 'publication',
  fields: {
    title: { type: GraphQLString },
    authors: { type: new GraphQLList(GraphQLString) },
    venue: { type: GraphQLString },
    links: { type: Link },
    date: { type: GraphQLString },
    featured: { type: GraphQLBoolean }
  }
});

const Award = new GraphQLObjectType({
  name: 'award',
  fields: {
    title: { type: GraphQLString },
    awardedBy: { type: GraphQLString },
    notes: { type: new GraphQLList(GraphQLString) },
    date: { type: GraphQLString },
    featured: { type: GraphQLBoolean },
    archived: { type: GraphQLBoolean }
  }
});

const Project = new GraphQLObjectType({
  name: 'project',
  fields: {
    title: { type: GraphQLString },
    notes: { type: new GraphQLList(GraphQLString) },
    date: { type: GraphQLString },
    featured: { type: GraphQLBoolean },
    archived: { type: GraphQLBoolean }
  }
});

const Skill = new GraphQLObjectType({
  name: 'skill',
  fields: {
    name: { type: GraphQLString },
    items: { type: new GraphQLList(GraphQLString) }
  }
});

const pdQuery = new GraphQLObjectType({
  name: 'personal_data_query',
  fields: {
    info: {
      type: Info,
      resolve: () => require('../../personal-data/000_info.json')
    },
    people: {
      type: new GraphQLList(People),
      resolve: () => require('../../personal-data/001_known.people.json')
    },
    education: {
      type: new GraphQLList(Education),
      resolve: () => require('../../personal-data/010_education.json')
    },
    coursework: {
      type: new GraphQLList(CourseWork),
      resolve: () => require('../../personal-data/011_coursework.json')
    },
    experience: {
      type: new GraphQLList(Experience),
      resolve: () => require('../../personal-data/020_experience.json')
    },
    publication: {
      type: new GraphQLList(Publication),
      resolve: () => require('../../personal-data/030_publication.json')
    },
    award: {
      type: new GraphQLList(Award),
      resolve: () => require('../../personal-data/040_award.json')
    },
    project: {
      type: new GraphQLList(Project),
      resolve: () => require('../../personal-data/050_project.json')
    },
    skill: {
      type: new GraphQLList(Skill),
      resolve: () => require('../../personal-data/060_skill.json')
    }
  }
});

const pdSchema = new GraphQLSchema({
  query: pdQuery
});

export { pdSchema };
