'use client'

import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'
import type { TLanguage } from '@/lib/i18n'

// ============================================================================
// Content
// ============================================================================

const CONTENT = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: February 2026',
    backToHome: 'Back to home',
    sections: [
      {
        title: '1. Introduction',
        content:
          'Welcome to LANEGAP. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our application.',
      },
      {
        title: '2. Information We Collect',
        content:
          'We collect information you provide directly to us, including:\n\n• Email address (for account creation and authentication)\n• Display name (optional)\n• Personal notes you create within the app\n\nWe do NOT collect:\n• Payment information\n• Location data\n• Device identifiers for advertising',
      },
      {
        title: '3. How We Use Your Information',
        content:
          'We use the information we collect to:\n\n• Provide, maintain, and improve our services\n• Send you verification emails and important updates\n• Sync your personal notes across devices\n• Respond to your comments and questions',
      },
      {
        title: '4. Data Storage',
        content:
          'Your data is stored securely using PocketBase. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.',
      },
      {
        title: '5. Data Sharing',
        content:
          'We do NOT sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:\n\n• With your consent\n• To comply with legal obligations\n• To protect our rights and safety',
      },
      {
        title: '6. Your Rights',
        content:
          'You have the right to:\n\n• Access your personal data\n• Correct inaccurate data\n• Delete your account and all associated data\n• Export your data\n\nYou can exercise these rights through the Settings page in the app.',
      },
      {
        title: '7. Cookies',
        content:
          'We use essential cookies only for authentication and language preferences. We do not use tracking cookies or third-party analytics.',
      },
      {
        title: "8. Children's Privacy",
        content:
          'Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.',
      },
      {
        title: '9. Changes to This Policy',
        content:
          'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
      },
      {
        title: '10. Contact Us',
        content:
          'If you have any questions about this privacy policy, please contact us at:\n\nEmail: contact@loltimeflash.com',
      },
    ],
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : Février 2026',
    backToHome: "Retour à l'accueil",
    sections: [
      {
        title: '1. Introduction',
        content:
          'Bienvenue sur LANEGAP. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre application.',
      },
      {
        title: '2. Informations Collectées',
        content:
          "Nous collectons les informations que vous nous fournissez directement, notamment :\n\n• Adresse email (pour la création de compte et l'authentification)\n• Nom d'affichage (optionnel)\n• Notes personnelles que vous créez dans l'app\n\nNous ne collectons PAS :\n• Informations de paiement\n• Données de localisation\n• Identifiants publicitaires",
      },
      {
        title: '3. Utilisation des Informations',
        content:
          'Nous utilisons les informations collectées pour :\n\n• Fournir, maintenir et améliorer nos services\n• Envoyer des emails de vérification et mises à jour importantes\n• Synchroniser vos notes personnelles entre vos appareils\n• Répondre à vos commentaires et questions',
      },
      {
        title: '4. Stockage des Données',
        content:
          "Vos données sont stockées de manière sécurisée avec PocketBase. Nous mettons en œuvre des mesures de sécurité appropriées pour protéger contre l'accès non autorisé, la modification, la divulgation ou la destruction de vos informations personnelles.",
      },
      {
        title: '5. Partage des Données',
        content:
          "Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager des informations uniquement dans les cas suivants :\n\n• Avec votre consentement\n• Pour respecter des obligations légales\n• Pour protéger nos droits et notre sécurité",
      },
      {
        title: '6. Vos Droits',
        content:
          "Vous avez le droit de :\n\n• Accéder à vos données personnelles\n• Corriger les données inexactes\n• Supprimer votre compte et toutes les données associées\n• Exporter vos données\n\nVous pouvez exercer ces droits via la page Paramètres de l'app.",
      },
      {
        title: '7. Cookies',
        content:
          "Nous utilisons uniquement des cookies essentiels pour l'authentification et les préférences de langue. Nous n'utilisons pas de cookies de tracking ni d'analytics tiers.",
      },
      {
        title: '8. Confidentialité des Enfants',
        content:
          "Notre service n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans.",
      },
      {
        title: '9. Modifications de cette Politique',
        content:
          'Nous pouvons mettre à jour cette politique de confidentialité de temps en temps. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page et en mettant à jour la date de "Dernière mise à jour".',
      },
      {
        title: '10. Nous Contacter',
        content:
          'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à :\n\nEmail : mehdi.hattou1@gmail.com',
      },
    ],
  },
}

// ============================================================================
// Component
// ============================================================================

interface IPrivacyPageClientProps {
  language: TLanguage
}

export const PrivacyPageClient = ({ language }: IPrivacyPageClientProps) => {
  const content = CONTENT[language]

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      >
        <LuArrowLeft className="h-4 w-4" />
        {content.backToHome}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">{content.title}</h1>
        <p className="text-sm text-white/40">{content.lastUpdated}</p>
      </div>

      {/* Content Sections */}
      <div className="flex flex-col gap-8">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-lg font-semibold text-white">{section.title}</h2>
            <p className="whitespace-pre-line text-white/70">{section.content}</p>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-white/10 pt-8">
        <p className="text-center text-sm text-white/40">
          © {new Date().getFullYear()} LANEGAP. All rights reserved.
        </p>
      </div>
    </main>
  )
}
