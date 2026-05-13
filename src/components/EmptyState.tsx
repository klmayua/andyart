import { Layers, Search, Inbox, FileText, CreditCard, Calendar, Heart, Lock, Palette, ClipboardList, BarChart3 } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'compact' | 'page';
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
}: EmptyStateProps) {
  const isCompact = variant === 'compact';
  const isPage = variant === 'page';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        isPage ? 'min-h-[50vh] py-20' : isCompact ? 'py-10' : 'py-12'
      }`}
    >
      {Icon && (
        <div
          className={`flex items-center justify-center rounded-2xl bg-andy-gold/5 border border-andy-gold/20 ${
            isPage ? 'w-16 h-16 mb-5' : isCompact ? 'w-10 h-10 mb-3' : 'w-14 h-14 mb-4'
          }`}
        >
          <Icon
            size={isPage ? 28 : isCompact ? 18 : 22}
            className="text-andy-gold/60"
            strokeWidth={1.5}
          />
        </div>
      )}
      <h3
        className={`font-serif font-semibold text-andy-black ${
          isPage ? 'text-xl mb-2' : isCompact ? 'text-sm mb-1' : 'text-base mb-1.5'
        }`}
      >
        {title}
      </h3>
      {description && (
        <p
          className={`text-andy-bronze/60 leading-relaxed max-w-xs mx-auto ${
            isPage ? 'text-sm mb-5' : isCompact ? 'text-xs mb-3' : 'text-xs mb-4'
          }`}
        >
          {description}
        </p>
      )}
      {action && (
        <a
          href={action.href}
          className={`inline-flex items-center gap-1.5 font-medium text-andy-gold hover:text-andy-bronze transition-colors motion-hover ${
            isPage ? 'text-sm' : 'text-xs'
          }`}
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

/* Preset empty states for common scenarios */
export const EmptyStates = {
  Collection: () => (
    <EmptyState
      icon={Layers}
      title="Your collection is empty"
      description="Begin your collecting journey by exploring our curated works."
      action={{ label: 'Explore Collection', href: '/gallery' }}
    />
  ),
  Acquisitions: () => (
    <EmptyState
      icon={FileText}
      title="No acquisitions yet"
      description="Your acquisition history will appear here after your first purchase."
      action={{ label: 'Browse Works', href: '/gallery' }}
    />
  ),
  Certificates: () => (
    <EmptyState
      icon={Lock}
      title="No certificates yet"
      description="Certificates of authenticity will be issued with each acquisition."
      action={{ label: 'Explore Collection', href: '/gallery' }}
    />
  ),
  Viewings: () => (
    <EmptyState
      icon={Calendar}
      title="No viewings yet"
      description="Book a private viewing and your appointments will appear here."
      action={{ label: 'Book a Viewing', href: '/consult' }}
    />
  ),
  Wishlist: () => (
    <EmptyState
      icon={Heart}
      title="Your wishlist is empty"
      description="Save works you love to revisit them later."
      action={{ label: 'Discover Works', href: '/gallery' }}
    />
  ),
  Vault: () => (
    <EmptyState
      icon={Lock}
      title="Your vault is empty"
      description="Securely store certificates, invoices, and provenance documents here."
    />
  ),
  Payments: () => (
    <EmptyState
      icon={CreditCard}
      title="No payments yet"
      description="Payment history will appear here after your first transaction."
    />
  ),
  Inventory: () => (
    <EmptyState
      icon={Palette}
      title="No works in inventory"
      description="Your available, consigned, and sold works will appear here."
    />
  ),
  Consignments: () => (
    <EmptyState
      icon={ClipboardList}
      title="No consignments yet"
      description="Gallery consignment agreements will be listed here."
    />
  ),
  Commissions: () => (
    <EmptyState
      icon={Palette}
      title="No commissions yet"
      description="Commission briefs and milestone tracking will appear here."
    />
  ),
  Exhibitions: () => (
    <EmptyState
      icon={Calendar}
      title="No exhibitions yet"
      description="Exhibition participation records will appear here."
    />
  ),
  Payouts: () => (
    <EmptyState
      icon={CreditCard}
      title="No payouts yet"
      description="Artist payout records will appear here."
    />
  ),
  Analytics: () => (
    <EmptyState
      icon={BarChart3}
      title="No analytics yet"
      description="Performance metrics will appear here once data is available."
    />
  ),
  Search: ({ query }: { query?: string }) => (
    <EmptyState
      icon={Search}
      title={query ? `No results for "${query}"` : 'No results'}
      description="Try adjusting your search terms or filters."
    />
  ),
  Inbox: () => (
    <EmptyState
      icon={Inbox}
      title="Nothing here"
      description="Items will appear here when available."
      variant="compact"
    />
  ),
};
