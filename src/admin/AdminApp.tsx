import { Admin, CustomRoutes } from 'react-admin'
import { Route } from 'react-router-dom'
import { authProvider } from './authProvider'
import { dataProvider } from './dataProvider'
import { Dashboard } from './dashboard'
import { PagesHub } from './pages/PagesHub'
import { ParishLoginPage } from './LoginPage'
import { ParishLayout } from './layout/ParishLayout'
import { parishTheme } from '../theme/parishTheme'
import {
  contactResources,
  socialNetworkResources,
  parishLogoResources,
  navigationResources,
  pageBannerResources,
  homeHeroSlideResources,
  homeCurateMessageResources,
  homeAboutResources,
  parishHistoryResources,
  parishCurateResources,
  parishMassResources,
  parishCommissionResources,
  parishGroupResources,
  parishSecretaryVisitResources,
  parishCurateVisitResources,
  weeklyAnnouncementResources,
  parishAnnouncementResources,
  liturgyCalendarResources,
  liturgyHomilyResources,
  liturgyDailyResources,
  liveStreamSettingsResources,
  liveStreamPlatformResources,
  mediaAlbumResources,
  mediaPhotoResources,
  mediaVideoResources,
  churchSectionResources,
  donationSettingsResources,
  donationPaymentMethodResources,
  visitorMessageResources,
  parishUserResources,
} from './resources'
import { SettingsPage } from './pages/SettingsPage'

export function AdminApp() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      layout={ParishLayout}
      loginPage={ParishLoginPage}
      theme={parishTheme}
      title="Paroisse Résurrection"
      requireAuth
    >
      {contactResources}
      {socialNetworkResources}
      {parishLogoResources}
      {navigationResources}
      {pageBannerResources}
      {homeHeroSlideResources}
      {homeCurateMessageResources}
      {homeAboutResources}
      {parishHistoryResources}
      {parishCurateResources}
      {parishMassResources}
      {parishCommissionResources}
      {parishGroupResources}
      {weeklyAnnouncementResources}
      {parishAnnouncementResources}
      {liturgyCalendarResources}
      {liturgyHomilyResources}
      {liturgyDailyResources}
      {liveStreamSettingsResources}
      {liveStreamPlatformResources}
      {mediaAlbumResources}
      {mediaPhotoResources}
      {mediaVideoResources}
      {churchSectionResources}
      {donationSettingsResources}
      {donationPaymentMethodResources}
      {parishSecretaryVisitResources}
      {parishCurateVisitResources}
      {visitorMessageResources}
      {parishUserResources}
      <CustomRoutes>
        <Route path="/pages" element={<PagesHub />} />
        <Route path="/settings" element={<SettingsPage />} />
      </CustomRoutes>
    </Admin>
  )
}
