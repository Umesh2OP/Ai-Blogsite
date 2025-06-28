import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';

const trendingBlogs = [
  {
    title: 'How AI is Changing Blogging',
    tag: 'Tech',
    description: 'Explore how ChatGPT and generative AI tools are reshaping content creation.',
    color: '#8a2be2'
  },
  {
    title: '10 Places to Travel Alone in 2025',
    tag: 'Travel',
    description: 'Discover the best solo travel destinations with practical safety tips.',
    color: '#1e90ff'
  },
  {
    title: 'Healthy Eating on a Budget',
    tag: 'Lifestyle',
    description: 'Learn how to eat clean without breaking the bank with easy recipes.',
    color: '#00b894'
  },
  {
    title: 'Dark Mode UI Trends',
    tag: 'Design',
    description: 'How dark UIs and neumorphism are enhancing user experience.',
    color: '#ff6b6b'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18
    }
  }
};

const Trending = () => {
  return (
    <Box
      sx={{
        py: 6,
        px: { xs: 3, md: 6 },
        background: '#0b0c1a',
        color: 'white',
        minHeight: '100vh'
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        gutterBottom
        mt={16}
        mb={6}
        sx={{
          color: '#d1bfff',
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 1,
          letterSpacing: 1
        }}
      >
        🔥 Trending Topics
      </Typography>

      {/* Glowing Separator Line */}
      <Box
        sx={{
            
            
          height: '6px',
          width: '150px',
          
          margin: '0 auto 40px',
          borderRadius: '10px',
          background: 'radial-gradient(circle, #ff1a1a, transparent)',
          boxShadow: '0 0 12px 4px #ff1a1a'
        }}
      />

      {/* Card Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Grid container spacing={4} justifyContent="center">
          {trendingBlogs.map((blog, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.03,
                  rotate: 0.2,
                  transition: { type: 'spring', stiffness: 150 }
                }}
                style={{ borderRadius: '24px' }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #1c1d2b, #11121a)',
                    borderRadius: '24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2,
                    position: 'relative',
                    boxShadow: `0 0 25px ${blog.color}66`, // glow always ON
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      backdropFilter: 'blur(8px)',
                      boxShadow: `0 0 35px ${blog.color}aa`
                    }
                  }}
                >
                  <CardContent>
                    <Chip
                      label={blog.tag}
                      sx={{
                        backgroundColor: blog.color,
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 2,
                        px: 1.5,
                        py: 0.5,
                        fontSize: '0.75rem'
                      }}
                    />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: '#f5f5f5',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        fontSize: '1.1rem'
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#bbb', mt: 1, lineHeight: 1.6 }}
                    >
                      {blog.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Trending;
