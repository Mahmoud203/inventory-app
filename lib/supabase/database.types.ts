export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      sections: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sections_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      stores: {
        Row: {
          id: string;
          section_id: string;
          user_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          user_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          user_id?: string;
          name?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stores_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "sections";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          id: string;
          store_id: string;
          user_id: string;
          name: string;
          notes: string | null;
          photo_url: string | null;
          has_qr: boolean;
          qr_data: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          store_id: string;
          user_id: string;
          name: string;
          notes?: string | null;
          photo_url?: string | null;
          has_qr?: boolean;
          qr_data?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          store_id?: string;
          user_id?: string;
          name?: string;
          notes?: string | null;
          photo_url?: string | null;
          has_qr?: boolean;
          qr_data?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey";
            columns: ["store_id"];
            isOneToOne: false;
            referencedRelation: "stores";
            referencedColumns: ["id"];
          }
        ];
      };
      recently_viewed: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          viewed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          viewed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          viewed_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recently_viewed_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
