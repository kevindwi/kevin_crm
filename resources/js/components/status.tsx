import { Badge } from './ui/badge';

export default function Status({ row }: { row: string }) {
    const status = row as string;

    const styles = {
        approved:
            'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
        rejected:
            'bg-destructive-foreground/10 [a&]:hover:bg-destructive-foreground/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
        waiting:
            'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
    }[status];

    return <Badge className={styles}>{row}</Badge>;
}
