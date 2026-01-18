'use client'

import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Package, CreditCard, LogOut, Megaphone, Star, Download, Tags, RotateCcw, Users, Settings, QrCode, Bell, Menu } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { signOut } from "next-auth/react"

export function AdminSidebar({ username }: { username: string }) {
    const { t } = useI18n()

    const NavLink = ({ href, icon, label, closeOnNavigate }: { href: string; icon: ReactNode; label: string; closeOnNavigate?: boolean }) => {
        const link = closeOnNavigate ? (
            <SheetClose asChild>
                <Link href={href}>{icon}{label}</Link>
            </SheetClose>
        ) : (
            <Link href={href}>{icon}{label}</Link>
        )
        return (
            <Button variant="ghost" asChild className="justify-start">
                {link}
            </Button>
        )
    }

    const SidebarContent = ({ closeOnNavigate = false, showTitle = true }: { closeOnNavigate?: boolean; showTitle?: boolean }) => (
        <>
            {showTitle && (
                <div className="flex items-center gap-2 font-bold text-xl px-2 mb-6">
                    <span>{t('common.adminTitle')}</span>
                </div>
            )}
            <nav className="flex flex-col gap-2">
                <NavLink href="/admin/settings" icon={<Settings className="mr-2 h-4 w-4" />} label={t('common.storeSettings')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/products" icon={<Package className="mr-2 h-4 w-4" />} label={t('common.productManagement')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/orders" icon={<CreditCard className="mr-2 h-4 w-4" />} label={t('common.ordersRefunds')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/refunds" icon={<RotateCcw className="mr-2 h-4 w-4" />} label={t('common.refundRequests')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/categories" icon={<Tags className="mr-2 h-4 w-4" />} label={t('common.categoriesManage')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/users" icon={<Users className="mr-2 h-4 w-4" />} label={t('common.customers')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/reviews" icon={<Star className="mr-2 h-4 w-4" />} label={t('common.reviews')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/announcement" icon={<Megaphone className="mr-2 h-4 w-4" />} label={t('announcement.title')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/data" icon={<Download className="mr-2 h-4 w-4" />} label={t('common.dataExport')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/collect" icon={<QrCode className="mr-2 h-4 w-4" />} label={t('payment.adminMenu')} closeOnNavigate={closeOnNavigate} />
                <NavLink href="/admin/notifications" icon={<Bell className="mr-2 h-4 w-4" />} label={t('admin.settings.notifications.title')} closeOnNavigate={closeOnNavigate} />
            </nav>
            <div className="mt-auto pt-6 border-t">
                <div className="px-2 text-sm text-muted-foreground mb-4">
                    {t('common.loggedInAs')} <br /> <strong className="text-foreground">{username}</strong>
                </div>
                {closeOnNavigate ? (
                    <SheetClose asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start text-muted-foreground"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" />{t('common.logout')}
                        </Button>
                    </SheetClose>
                ) : (
                    <Button
                        variant="outline"
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut className="mr-2 h-4 w-4" />{t('common.logout')}
                    </Button>
                )}
            </div>
        </>
    )

    return (
        <>
            {/* Mobile header */}
            <div className="md:hidden sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-bold">{t('common.adminTitle')}</span>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Menu className="h-4 w-4 mr-2" />
                                {t('common.menu')}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-4/5 max-w-sm">
                            <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-6">
                                <SidebarContent closeOnNavigate showTitle={false} />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:flex-col md:w-64 bg-muted/40 border-r md:min-h-screen p-6 gap-4">
                <SidebarContent />
            </aside>
        </>
    )
}
