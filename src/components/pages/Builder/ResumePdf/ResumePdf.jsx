import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Template color configurations
const getTemplateColors = (templateId) => {
  const configs = {
    1: { primary: '#3b82f6', secondary: '#eff6ff', text: '#1e3a8a' }, // Blue
    2: { primary: '#a855f7', secondary: '#fae8ff', text: '#581c87' }, // Purple
    3: { primary: '#f97316', secondary: '#fff7ed', text: '#9a3412' }, // Orange
    4: { primary: '#22c55e', secondary: '#f0fdf4', text: '#14532d' }, // Green
    5: { primary: '#6366f1', secondary: '#eef2ff', text: '#312e81' }, // Indigo
    6: { primary: '#f59e0b', secondary: '#fffbeb', text: '#78350f' }, // Amber
  };
  return configs[templateId] || configs[1];
};

// Create dynamic styles based on template
const createStyles = (templateId) => {
  const colors = getTemplateColors(templateId);
  
  return StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 11,
      fontFamily: 'Helvetica',
      color: '#1f2937',
      backgroundColor: '#ffffff',
    },
    header: {
      textAlign: 'center',
      marginBottom: 20,
      paddingBottom: 15,
      borderBottom: `3 solid ${colors.primary}`,
      backgroundColor: colors.secondary,
      padding: 20,
      borderRadius: 4,
    },
    name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
      letterSpacing: 0.5,
    },
    contactRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    contactItem: {
      fontSize: 10,
      color: '#6b7280',
      marginHorizontal: 8,
    },
    separator: {
      fontSize: 10,
      color: '#9ca3af',
    },
    section: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
      textTransform: 'uppercase',
      color: colors.text,
      borderBottom: `2 solid ${colors.primary}`,
      paddingBottom: 4,
      letterSpacing: 1,
    },
    experienceItem: {
      marginBottom: 12,
      borderLeft: `3 solid ${colors.primary}`,
      paddingLeft: 12,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    jobTitle: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 2,
      flex: 1,
    },
    company: {
      fontSize: 11,
      fontWeight: 'semibold',
      color: '#374151',
      marginBottom: 4,
    },
    dateRange: {
      fontSize: 9,
      color: '#6b7280',
      backgroundColor: '#f3f4f6',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 3,
    },
    description: {
      fontSize: 10,
      color: '#4b5563',
      lineHeight: 1.5,
      marginTop: 4,
    },
    projectItem: {
      marginBottom: 12,
      borderLeft: `3 solid ${colors.primary}`,
      paddingLeft: 12,
    },
    projectName: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 4,
    },
    techStackLabel: {
      fontSize: 9,
      color: '#6b7280',
      marginBottom: 2,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    technologies: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 4,
      fontWeight: 'semibold',
    },
    projectLink: {
      fontSize: 9,
      color: colors.primary,
      marginTop: 2,
    },
    skillsWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    skillItem: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.secondary,
      border: `1 solid ${colors.primary}`,
      borderRadius: 4,
      fontSize: 10,
      color: colors.text,
      fontWeight: 'semibold',
      marginRight: 6,
      marginBottom: 6,
    },
    summaryText: {
      fontSize: 11,
      lineHeight: 1.6,
      color: '#374151',
      textAlign: 'justify',
    },
  });
};

const ResumePdf = ({ personalInfo, experiences, education, skills, projects, templateId = 1 }) => {
  const styles = createStyles(templateId);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{personalInfo.email || 'email@example.com'}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.contactItem}>{personalInfo.phone || '+1234567890'}</Text>
            {personalInfo.location && (
              <>
                <Text style={styles.separator}>•</Text>
                <Text style={styles.contactItem}>{personalInfo.location}</Text>
              </>
            )}
          </View>
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.jobTitle}>{exp.title || 'Job Title'}</Text>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.dateRange}>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                  )}
                </View>
                <Text style={styles.company}>{exp.company || 'Company'}</Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.jobTitle}>{edu.degree || 'Degree'}</Text>
                  {edu.year && (
                    <Text style={styles.dateRange}>{edu.year}</Text>
                  )}
                </View>
                <Text style={styles.company}>{edu.school || 'School'}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.projectItem}>
                <Text style={styles.projectName}>{proj.name || 'Project Name'}</Text>
                {proj.technologies && (
                  <View>
                    <Text style={styles.techStackLabel}>TECH STACK:</Text>
                    <Text style={styles.technologies}>{proj.technologies}</Text>
                  </View>
                )}
                {proj.description && (
                  <Text style={styles.description}>{proj.description}</Text>
                )}
                {proj.link && (
                  <Text style={styles.projectLink}>{proj.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Technologies</Text>
            <View style={styles.skillsWrap}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePdf;