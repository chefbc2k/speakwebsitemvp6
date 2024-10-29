export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activitylogs: {
        Row: {
          action: string
          activity_log_id: string
          details: string | null
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          activity_log_id?: string
          details?: string | null
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          activity_log_id?: string
          details?: string | null
          timestamp?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activitylogs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      analyticsevents: {
        Row: {
          analytics_event_id: string
          event_data: Json | null
          event_type: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          analytics_event_id?: string
          event_data?: Json | null
          event_type: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          analytics_event_id?: string
          event_data?: Json | null
          event_type?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analyticsevents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bids: {
        Row: {
          amount: number
          bid_id: string
          bidder_id: string
          currency: string
          listing_id: string
          placed_at: string
          status: string
        }
        Insert: {
          amount: number
          bid_id?: string
          bidder_id: string
          currency: string
          listing_id: string
          placed_at?: string
          status: string
        }
        Update: {
          amount?: number
          bid_id?: string
          bidder_id?: string
          currency?: string
          listing_id?: string
          placed_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_bidder_id_fkey"
            columns: ["bidder_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "bids_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["listing_id"]
          },
        ]
      }
      categories: {
        Row: {
          category_id: string
          name: string
          subcategories: string | null
        }
        Insert: {
          category_id?: string
          name: string
          subcategories?: string | null
        }
        Update: {
          category_id?: string
          name?: string
          subcategories?: string | null
        }
        Relationships: []
      }
      collectionnfts: {
        Row: {
          collection_id: string
          nft_id: string
        }
        Insert: {
          collection_id: string
          nft_id: string
        }
        Update: {
          collection_id?: string
          nft_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collectionnfts_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "collectionnfts_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
        ]
      }
      collections: {
        Row: {
          collection_id: string
          created_at: string
          description: string | null
          name: string
          owner_id: string
        }
        Insert: {
          collection_id?: string
          created_at?: string
          description?: string | null
          name: string
          owner_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          description?: string | null
          name?: string
          owner_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collections_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      contractnfts: {
        Row: {
          contract_id: string
          nft_id: string
        }
        Insert: {
          contract_id: string
          nft_id: string
        }
        Update: {
          contract_id?: string
          nft_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractnfts_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["contract_id"]
          },
          {
            foreignKeyName: "contractnfts_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
        ]
      }
      contracts: {
        Row: {
          abi: string | null
          address: string
          author: string | null
          bytecode: string | null
          contact_name: string | null
          contract_id: string
          deployment_block_number: number
          deployment_timestamp: string
          deployment_transaction_hash: string
          description: string | null
          license: string | null
          source_code: string | null
          tags: Json | null
          version: string | null
        }
        Insert: {
          abi?: string | null
          address: string
          author?: string | null
          bytecode?: string | null
          contact_name?: string | null
          contract_id?: string
          deployment_block_number: number
          deployment_timestamp?: string
          deployment_transaction_hash: string
          description?: string | null
          license?: string | null
          source_code?: string | null
          tags?: Json | null
          version?: string | null
        }
        Update: {
          abi?: string | null
          address?: string
          author?: string | null
          bytecode?: string | null
          contact_name?: string | null
          contract_id?: string
          deployment_block_number?: number
          deployment_timestamp?: string
          deployment_transaction_hash?: string
          description?: string | null
          license?: string | null
          source_code?: string | null
          tags?: Json | null
          version?: string | null
        }
        Relationships: []
      }
      contractusers: {
        Row: {
          contract_id: string
          user_id: string
        }
        Insert: {
          contract_id: string
          user_id: string
        }
        Update: {
          contract_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractusers_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["contract_id"]
          },
          {
            foreignKeyName: "contractusers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      contractvoices: {
        Row: {
          contract_id: string
          voice_id: string
        }
        Insert: {
          contract_id: string
          voice_id: string
        }
        Update: {
          contract_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractvoices_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["contract_id"]
          },
          {
            foreignKeyName: "contractvoices_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      experiencelevels: {
        Row: {
          description: string | null
          experience_level_id: string
          level: string
          requirement: string | null
          years_experience: number | null
        }
        Insert: {
          description?: string | null
          experience_level_id?: string
          level: string
          requirement?: string | null
          years_experience?: number | null
        }
        Update: {
          description?: string | null
          experience_level_id?: string
          level?: string
          requirement?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          favorited_at: string
          nft_id: string
          user_id: string
        }
        Insert: {
          favorited_at?: string
          nft_id: string
          user_id: string
        }
        Update: {
          favorited_at?: string
          nft_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      languages: {
        Row: {
          language_id: string
          name: string
        }
        Insert: {
          language_id?: string
          name: string
        }
        Update: {
          language_id?: string
          name?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          currency: string
          expires_at: string | null
          listed_at: string
          listing_id: string
          nft_id: string
          price: number
          seller_id: string
          status: string
        }
        Insert: {
          currency: string
          expires_at?: string | null
          listed_at?: string
          listing_id?: string
          nft_id: string
          price: number
          seller_id: string
          status: string
        }
        Update: {
          currency?: string
          expires_at?: string | null
          listed_at?: string
          listing_id?: string
          nft_id?: string
          price?: number
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          message_id: string
          read: boolean
          receiver_id: string
          sender_id: string
          sent_at: string
        }
        Insert: {
          content: string
          message_id?: string
          read?: boolean
          receiver_id: string
          sender_id: string
          sent_at?: string
        }
        Update: {
          content?: string
          message_id?: string
          read?: boolean
          receiver_id?: string
          sender_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      nftcategories: {
        Row: {
          category_id: string
          nft_id: string
        }
        Insert: {
          category_id: string
          nft_id: string
        }
        Update: {
          category_id?: string
          nft_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "nftcategories_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
        ]
      }
      nftlanguages: {
        Row: {
          language_id: string
          nft_id: string
        }
        Insert: {
          language_id: string
          nft_id: string
        }
        Update: {
          language_id?: string
          nft_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftlanguages_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "nftlanguages_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
        ]
      }
      nftproductionqualities: {
        Row: {
          nft_id: string
          production_quality_id: string
        }
        Insert: {
          nft_id: string
          production_quality_id: string
        }
        Update: {
          nft_id?: string
          production_quality_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftproductionqualities_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftproductionqualities_production_quality_id_fkey"
            columns: ["production_quality_id"]
            isOneToOne: false
            referencedRelation: "productionquality"
            referencedColumns: ["production_quality_id"]
          },
        ]
      }
      nftregionaldialects: {
        Row: {
          nft_id: string
          regional_dialect_id: string
        }
        Insert: {
          nft_id: string
          regional_dialect_id: string
        }
        Update: {
          nft_id?: string
          regional_dialect_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftregionaldialects_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftregionaldialects_regional_dialect_id_fkey"
            columns: ["regional_dialect_id"]
            isOneToOne: false
            referencedRelation: "regionaldialects"
            referencedColumns: ["regional_dialect_id"]
          },
        ]
      }
      nfts: {
        Row: {
          created_at: string
          creator_id: string
          description: string | null
          file_url: string
          geolocation: string | null
          nft_id: string
          price: number
          smart_contract_address: string | null
          title: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          description?: string | null
          file_url: string
          geolocation?: string | null
          nft_id?: string
          price: number
          smart_contract_address?: string | null
          title: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          description?: string | null
          file_url?: string
          geolocation?: string | null
          nft_id?: string
          price?: number
          smart_contract_address?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      nftsecondarylanguages: {
        Row: {
          nft_id: string
          secondary_language_id: string
        }
        Insert: {
          nft_id: string
          secondary_language_id: string
        }
        Update: {
          nft_id?: string
          secondary_language_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftsecondarylanguages_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftsecondarylanguages_secondary_language_id_fkey"
            columns: ["secondary_language_id"]
            isOneToOne: false
            referencedRelation: "secondarylanguages"
            referencedColumns: ["secondary_language_id"]
          },
        ]
      }
      nftstudioavailabilities: {
        Row: {
          nft_id: string
          studio_availability_id: string
        }
        Insert: {
          nft_id: string
          studio_availability_id: string
        }
        Update: {
          nft_id?: string
          studio_availability_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftstudioavailabilities_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftstudioavailabilities_studio_availability_id_fkey"
            columns: ["studio_availability_id"]
            isOneToOne: false
            referencedRelation: "studioavailabilities"
            referencedColumns: ["studio_availability_id"]
          },
        ]
      }
      nftstyletoneoptions: {
        Row: {
          nft_id: string
          style_tone_option_id: string
        }
        Insert: {
          nft_id: string
          style_tone_option_id: string
        }
        Update: {
          nft_id?: string
          style_tone_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftstyletoneoptions_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftstyletoneoptions_style_tone_option_id_fkey"
            columns: ["style_tone_option_id"]
            isOneToOne: false
            referencedRelation: "styletoneoptions"
            referencedColumns: ["style_tone_option_id"]
          },
        ]
      }
      nfttechnicalspecifications: {
        Row: {
          nft_id: string
          tech_spec_id: string
        }
        Insert: {
          nft_id: string
          tech_spec_id: string
        }
        Update: {
          nft_id?: string
          tech_spec_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfttechnicalspecifications_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nfttechnicalspecifications_tech_spec_id_fkey"
            columns: ["tech_spec_id"]
            isOneToOne: false
            referencedRelation: "technicalspecifications"
            referencedColumns: ["tech_spec_id"]
          },
        ]
      }
      nfttimezones: {
        Row: {
          nft_id: string
          time_zone_id: string
        }
        Insert: {
          nft_id: string
          time_zone_id: string
        }
        Update: {
          nft_id?: string
          time_zone_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nfttimezones_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nfttimezones_time_zone_id_fkey"
            columns: ["time_zone_id"]
            isOneToOne: false
            referencedRelation: "timezones"
            referencedColumns: ["time_zone_id"]
          },
        ]
      }
      nftvoicetraits: {
        Row: {
          nft_id: string
          voice_trait_id: string
        }
        Insert: {
          nft_id: string
          voice_trait_id: string
        }
        Update: {
          nft_id?: string
          voice_trait_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nftvoicetraits_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "nftvoicetraits_voice_trait_id_fkey"
            columns: ["voice_trait_id"]
            isOneToOne: false
            referencedRelation: "voicetraits"
            referencedColumns: ["trait_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          message: string
          notification_id: string
          read: boolean
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          message: string
          notification_id?: string
          read?: boolean
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          message?: string
          notification_id?: string
          read?: boolean
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ownerships: {
        Row: {
          acquired_at: string
          nft_id: string
          owner_id: string
          ownership_type: string
        }
        Insert: {
          acquired_at?: string
          nft_id: string
          owner_id: string
          ownership_type: string
        }
        Update: {
          acquired_at?: string
          nft_id?: string
          owner_id?: string
          ownership_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ownerships_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "ownerships_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      paymentmethods: {
        Row: {
          created_at: string
          details: string
          is_default: boolean
          payment_method_id: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details: string
          is_default?: boolean
          payment_method_id?: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: string
          is_default?: boolean
          payment_method_id?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "paymentmethods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      permissions: {
        Row: {
          description: string | null
          name: string
          permission_id: string
        }
        Insert: {
          description?: string | null
          name: string
          permission_id?: string
        }
        Update: {
          description?: string | null
          name?: string
          permission_id?: string
        }
        Relationships: []
      }
      productionquality: {
        Row: {
          description: string | null
          production_quality_id: string
          quality_type: string
        }
        Insert: {
          description?: string | null
          production_quality_id?: string
          quality_type: string
        }
        Update: {
          description?: string | null
          production_quality_id?: string
          quality_type?: string
        }
        Relationships: []
      }
      regionaldialects: {
        Row: {
          name: string
          regional_dialect_id: string
        }
        Insert: {
          name: string
          regional_dialect_id?: string
        }
        Update: {
          name?: string
          regional_dialect_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          creator_id: string | null
          nft_id: string | null
          rating: number
          review_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          creator_id?: string | null
          nft_id?: string | null
          rating: number
          review_id?: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          creator_id?: string | null
          nft_id?: string | null
          rating?: number
          review_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "reviews_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      rolepermissions: {
        Row: {
          permission_id: string
          role_id: string
        }
        Insert: {
          permission_id: string
          role_id: string
        }
        Update: {
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rolepermissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "rolepermissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          name: string
          role_id: string
        }
        Insert: {
          description?: string | null
          name: string
          role_id?: string
        }
        Update: {
          description?: string | null
          name?: string
          role_id?: string
        }
        Relationships: []
      }
      royalties: {
        Row: {
          contract_id: string | null
          creator_id: string
          nft_id: string
          percentage: number
          royalty_id: string
        }
        Insert: {
          contract_id?: string | null
          creator_id: string
          nft_id: string
          percentage: number
          royalty_id?: string
        }
        Update: {
          contract_id?: string | null
          creator_id?: string
          nft_id?: string
          percentage?: number
          royalty_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_contract"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["contract_id"]
          },
          {
            foreignKeyName: "royalties_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "royalties_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
        ]
      }
      secondarylanguages: {
        Row: {
          proficiency: string
          secondary_language_id: string
        }
        Insert: {
          proficiency: string
          secondary_language_id?: string
        }
        Update: {
          proficiency?: string
          secondary_language_id?: string
        }
        Relationships: []
      }
      "stripeaccounts ": {
        Row: {
          attrs: Json | null
          business_type: string | null
          country: string | null
          created: string | null
          email: string | null
          id: string | null
          type: string | null
        }
        Insert: {
          attrs?: Json | null
          business_type?: string | null
          country?: string | null
          created?: string | null
          email?: string | null
          id?: string | null
          type?: string | null
        }
        Update: {
          attrs?: Json | null
          business_type?: string | null
          country?: string | null
          created?: string | null
          email?: string | null
          id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      stripebalance: {
        Row: {
          amount: number | null
          attrs: Json | null
          balance_type: string | null
          currency: string | null
        }
        Insert: {
          amount?: number | null
          attrs?: Json | null
          balance_type?: string | null
          currency?: string | null
        }
        Update: {
          amount?: number | null
          attrs?: Json | null
          balance_type?: string | null
          currency?: string | null
        }
        Relationships: []
      }
      stripebalancetransfers: {
        Row: {
          amount: number | null
          attrs: Json | null
          created: string | null
          currency: string | null
          description: string | null
          fee: number | null
          id: string | null
          net: number | null
          status: string | null
          type: string | null
        }
        Insert: {
          amount?: number | null
          attrs?: Json | null
          created?: string | null
          currency?: string | null
          description?: string | null
          fee?: number | null
          id?: string | null
          net?: number | null
          status?: string | null
          type?: string | null
        }
        Update: {
          amount?: number | null
          attrs?: Json | null
          created?: string | null
          currency?: string | null
          description?: string | null
          fee?: number | null
          id?: string | null
          net?: number | null
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      studioavailabilities: {
        Row: {
          availability: string
          studio_availability_id: string
        }
        Insert: {
          availability: string
          studio_availability_id?: string
        }
        Update: {
          availability?: string
          studio_availability_id?: string
        }
        Relationships: []
      }
      styletonecategories: {
        Row: {
          name: string
          style_tone_category_id: string
        }
        Insert: {
          name: string
          style_tone_category_id?: string
        }
        Update: {
          name?: string
          style_tone_category_id?: string
        }
        Relationships: []
      }
      styletoneoptions: {
        Row: {
          category_id: string
          option: string
          style_tone_option_id: string
        }
        Insert: {
          category_id: string
          option: string
          style_tone_option_id?: string
        }
        Update: {
          category_id?: string
          option?: string
          style_tone_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "styletoneoptions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "styletonecategories"
            referencedColumns: ["style_tone_category_id"]
          },
        ]
      }
      supporttickets: {
        Row: {
          created_at: string
          description: string
          status: string
          subject: string
          support_ticket_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          status: string
          subject: string
          support_ticket_id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          status?: string
          subject?: string
          support_ticket_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supporttickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      technicalspecifications: {
        Row: {
          audio_quality: string
          bit_depth: string | null
          compatibility: string | null
          environment: string | null
          equipment: Json | null
          file_format: string | null
          latency: string | null
          max_channels: number | null
          noise_handling: string | null
          post_production_capabilities: Json | null
          power_source: string | null
          sample_rate: string
          target_quality: string | null
          tech_spec_id: string
          use_case: string | null
        }
        Insert: {
          audio_quality: string
          bit_depth?: string | null
          compatibility?: string | null
          environment?: string | null
          equipment?: Json | null
          file_format?: string | null
          latency?: string | null
          max_channels?: number | null
          noise_handling?: string | null
          post_production_capabilities?: Json | null
          power_source?: string | null
          sample_rate: string
          target_quality?: string | null
          tech_spec_id?: string
          use_case?: string | null
        }
        Update: {
          audio_quality?: string
          bit_depth?: string | null
          compatibility?: string | null
          environment?: string | null
          equipment?: Json | null
          file_format?: string | null
          latency?: string | null
          max_channels?: number | null
          noise_handling?: string | null
          post_production_capabilities?: Json | null
          power_source?: string | null
          sample_rate?: string
          target_quality?: string | null
          tech_spec_id?: string
          use_case?: string | null
        }
        Relationships: []
      }
      timezones: {
        Row: {
          name: string
          time_zone_id: string
        }
        Insert: {
          name: string
          time_zone_id?: string
        }
        Update: {
          name?: string
          time_zone_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          buyer_id: string
          nft_id: string
          price: number
          seller_id: string
          transaction_date: string
          transaction_id: string
        }
        Insert: {
          buyer_id: string
          nft_id: string
          price: number
          seller_id: string
          transaction_date?: string
          transaction_id?: string
        }
        Update: {
          buyer_id?: string
          nft_id?: string
          price?: number
          seller_id?: string
          transaction_date?: string
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "transactions_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["nft_id"]
          },
          {
            foreignKeyName: "transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usercategories: {
        Row: {
          category_id: string
          user_id: string
        }
        Insert: {
          category_id: string
          user_id: string
        }
        Update: {
          category_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usercategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "usercategories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userexperiences: {
        Row: {
          experience_level_id: string
          user_id: string
        }
        Insert: {
          experience_level_id: string
          user_id: string
        }
        Update: {
          experience_level_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userexperiences_experience_level_id_fkey"
            columns: ["experience_level_id"]
            isOneToOne: false
            referencedRelation: "experiencelevels"
            referencedColumns: ["experience_level_id"]
          },
          {
            foreignKeyName: "userexperiences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userlanguages: {
        Row: {
          language_id: string
          user_id: string
        }
        Insert: {
          language_id: string
          user_id: string
        }
        Update: {
          language_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userlanguages_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "userlanguages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userproductionqualities: {
        Row: {
          production_quality_id: string
          user_id: string
        }
        Insert: {
          production_quality_id: string
          user_id: string
        }
        Update: {
          production_quality_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userproductionqualities_production_quality_id_fkey"
            columns: ["production_quality_id"]
            isOneToOne: false
            referencedRelation: "productionquality"
            referencedColumns: ["production_quality_id"]
          },
          {
            foreignKeyName: "userproductionqualities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userregionaldialects: {
        Row: {
          regional_dialect_id: string
          user_id: string
        }
        Insert: {
          regional_dialect_id: string
          user_id: string
        }
        Update: {
          regional_dialect_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userregionaldialects_regional_dialect_id_fkey"
            columns: ["regional_dialect_id"]
            isOneToOne: false
            referencedRelation: "regionaldialects"
            referencedColumns: ["regional_dialect_id"]
          },
          {
            foreignKeyName: "userregionaldialects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userroles: {
        Row: {
          role_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userroles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "userroles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          geo_location: string | null
          smart_contract_address: string | null
          user_auth: string
          user_id: string
          username: string
          wallet_address: string
        }
        Insert: {
          created_at?: string
          email: string
          geo_location?: string | null
          smart_contract_address?: string | null
          user_auth: string
          user_id?: string
          username: string
          wallet_address: string
        }
        Update: {
          created_at?: string
          email?: string
          geo_location?: string | null
          smart_contract_address?: string | null
          user_auth?: string
          user_id?: string
          username?: string
          wallet_address?: string
        }
        Relationships: []
      }
      usersecondarylanguages: {
        Row: {
          secondary_language_id: string
          user_id: string
        }
        Insert: {
          secondary_language_id: string
          user_id: string
        }
        Update: {
          secondary_language_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usersecondarylanguages_secondary_language_id_fkey"
            columns: ["secondary_language_id"]
            isOneToOne: false
            referencedRelation: "secondarylanguages"
            referencedColumns: ["secondary_language_id"]
          },
          {
            foreignKeyName: "usersecondarylanguages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userstudioavailabilities: {
        Row: {
          studio_availability_id: string
          user_id: string
        }
        Insert: {
          studio_availability_id: string
          user_id: string
        }
        Update: {
          studio_availability_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userstudioavailabilities_studio_availability_id_fkey"
            columns: ["studio_availability_id"]
            isOneToOne: false
            referencedRelation: "studioavailabilities"
            referencedColumns: ["studio_availability_id"]
          },
          {
            foreignKeyName: "userstudioavailabilities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      userstyletoneoptions: {
        Row: {
          style_tone_option_id: string
          user_id: string
        }
        Insert: {
          style_tone_option_id: string
          user_id: string
        }
        Update: {
          style_tone_option_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "userstyletoneoptions_style_tone_option_id_fkey"
            columns: ["style_tone_option_id"]
            isOneToOne: false
            referencedRelation: "styletoneoptions"
            referencedColumns: ["style_tone_option_id"]
          },
          {
            foreignKeyName: "userstyletoneoptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usertechnicalspecifications: {
        Row: {
          tech_spec_id: string
          user_id: string
        }
        Insert: {
          tech_spec_id: string
          user_id: string
        }
        Update: {
          tech_spec_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usertechnicalspecifications_tech_spec_id_fkey"
            columns: ["tech_spec_id"]
            isOneToOne: false
            referencedRelation: "technicalspecifications"
            referencedColumns: ["tech_spec_id"]
          },
          {
            foreignKeyName: "usertechnicalspecifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      usertimezones: {
        Row: {
          time_zone_id: string
          user_id: string
        }
        Insert: {
          time_zone_id: string
          user_id: string
        }
        Update: {
          time_zone_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usertimezones_time_zone_id_fkey"
            columns: ["time_zone_id"]
            isOneToOne: false
            referencedRelation: "timezones"
            referencedColumns: ["time_zone_id"]
          },
          {
            foreignKeyName: "usertimezones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      uservoicetraits: {
        Row: {
          user_id: string
          voice_trait_id: string
        }
        Insert: {
          user_id: string
          voice_trait_id: string
        }
        Update: {
          user_id?: string
          voice_trait_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uservoicetraits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "uservoicetraits_voice_trait_id_fkey"
            columns: ["voice_trait_id"]
            isOneToOne: false
            referencedRelation: "voicetraits"
            referencedColumns: ["trait_id"]
          },
        ]
      }
      voice_clip_locations: {
        Row: {
          accuracy: number | null
          captured_at: string
          device_info: string | null
          ip_address: unknown
          latitude: number
          location_id: string
          longitude: number
          user_id: string
          voice_clip_id: string
        }
        Insert: {
          accuracy?: number | null
          captured_at?: string
          device_info?: string | null
          ip_address: unknown
          latitude: number
          location_id?: string
          longitude: number
          user_id: string
          voice_clip_id: string
        }
        Update: {
          accuracy?: number | null
          captured_at?: string
          device_info?: string | null
          ip_address?: unknown
          latitude?: number
          location_id?: string
          longitude?: number
          user_id?: string
          voice_clip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voice_clip_locations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "voice_clip_locations_voice_clip_id_fkey"
            columns: ["voice_clip_id"]
            isOneToOne: false
            referencedRelation: "voice_clips"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voice_clips: {
        Row: {
          created_at: string
          description: string | null
          name: string
          user_id: string
          voice_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          name: string
          user_id: string
          voice_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          name?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voices_clips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      voicecategories: {
        Row: {
          category_id: string
          voice_id: string
        }
        Insert: {
          category_id: string
          voice_id: string
        }
        Update: {
          category_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicecategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "voicecategories_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voiceexperiences: {
        Row: {
          experience_level_id: string
          voice_id: string
        }
        Insert: {
          experience_level_id: string
          voice_id: string
        }
        Update: {
          experience_level_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voiceexperiences_experience_level_id_fkey"
            columns: ["experience_level_id"]
            isOneToOne: false
            referencedRelation: "experiencelevels"
            referencedColumns: ["experience_level_id"]
          },
          {
            foreignKeyName: "voiceexperiences_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicelanguages: {
        Row: {
          language_id: string
          voice_id: string
        }
        Insert: {
          language_id: string
          voice_id: string
        }
        Update: {
          language_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicelanguages_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["language_id"]
          },
          {
            foreignKeyName: "voicelanguages_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voiceproductionqualities: {
        Row: {
          production_quality_id: string
          voice_id: string
        }
        Insert: {
          production_quality_id: string
          voice_id: string
        }
        Update: {
          production_quality_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voiceproductionqualities_production_quality_id_fkey"
            columns: ["production_quality_id"]
            isOneToOne: false
            referencedRelation: "productionquality"
            referencedColumns: ["production_quality_id"]
          },
          {
            foreignKeyName: "voiceproductionqualities_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voiceregionaldialects: {
        Row: {
          regional_dialect_id: string
          voice_id: string
        }
        Insert: {
          regional_dialect_id: string
          voice_id: string
        }
        Update: {
          regional_dialect_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voiceregionaldialects_regional_dialect_id_fkey"
            columns: ["regional_dialect_id"]
            isOneToOne: false
            referencedRelation: "regionaldialects"
            referencedColumns: ["regional_dialect_id"]
          },
          {
            foreignKeyName: "voiceregionaldialects_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voices: {
        Row: {
          created_at: string
          description: string | null
          name: string
          user_id: string
          voice_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          name: string
          user_id: string
          voice_id?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          name?: string
          user_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      voicesecondarylanguages: {
        Row: {
          secondary_language_id: string
          voice_id: string
        }
        Insert: {
          secondary_language_id: string
          voice_id: string
        }
        Update: {
          secondary_language_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicesecondarylanguages_secondary_language_id_fkey"
            columns: ["secondary_language_id"]
            isOneToOne: false
            referencedRelation: "secondarylanguages"
            referencedColumns: ["secondary_language_id"]
          },
          {
            foreignKeyName: "voicesecondarylanguages_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicestudioavailabilities: {
        Row: {
          studio_availability_id: string
          voice_id: string
        }
        Insert: {
          studio_availability_id: string
          voice_id: string
        }
        Update: {
          studio_availability_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicestudioavailabilities_studio_availability_id_fkey"
            columns: ["studio_availability_id"]
            isOneToOne: false
            referencedRelation: "studioavailabilities"
            referencedColumns: ["studio_availability_id"]
          },
          {
            foreignKeyName: "voicestudioavailabilities_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicestyletoneoptions: {
        Row: {
          style_tone_option_id: string
          voice_id: string
        }
        Insert: {
          style_tone_option_id: string
          voice_id: string
        }
        Update: {
          style_tone_option_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicestyletoneoptions_style_tone_option_id_fkey"
            columns: ["style_tone_option_id"]
            isOneToOne: false
            referencedRelation: "styletoneoptions"
            referencedColumns: ["style_tone_option_id"]
          },
          {
            foreignKeyName: "voicestyletoneoptions_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicetechnicalspecifications: {
        Row: {
          tech_spec_id: string
          voice_id: string
        }
        Insert: {
          tech_spec_id: string
          voice_id: string
        }
        Update: {
          tech_spec_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicetechnicalspecifications_tech_spec_id_fkey"
            columns: ["tech_spec_id"]
            isOneToOne: false
            referencedRelation: "technicalspecifications"
            referencedColumns: ["tech_spec_id"]
          },
          {
            foreignKeyName: "voicetechnicalspecifications_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicetimezones: {
        Row: {
          time_zone_id: string
          voice_id: string
        }
        Insert: {
          time_zone_id: string
          voice_id: string
        }
        Update: {
          time_zone_id?: string
          voice_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicetimezones_time_zone_id_fkey"
            columns: ["time_zone_id"]
            isOneToOne: false
            referencedRelation: "timezones"
            referencedColumns: ["time_zone_id"]
          },
          {
            foreignKeyName: "voicetimezones_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
        ]
      }
      voicetraits: {
        Row: {
          info: string | null
          trait_id: string
          value: string
        }
        Insert: {
          info?: string | null
          trait_id?: string
          value: string
        }
        Update: {
          info?: string | null
          trait_id?: string
          value?: string
        }
        Relationships: []
      }
      voicevoicetraits: {
        Row: {
          voice_id: string
          voice_trait_id: string
        }
        Insert: {
          voice_id: string
          voice_trait_id: string
        }
        Update: {
          voice_id?: string
          voice_trait_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "voicevoicetraits_voice_id_fkey"
            columns: ["voice_id"]
            isOneToOne: false
            referencedRelation: "voices"
            referencedColumns: ["voice_id"]
          },
          {
            foreignKeyName: "voicevoicetraits_voice_trait_id_fkey"
            columns: ["voice_trait_id"]
            isOneToOne: false
            referencedRelation: "voicetraits"
            referencedColumns: ["trait_id"]
          },
        ]
      }
      todos: {
        Row: {
          id: number
          task: string
        }
        Insert: {
          id?: number
          task: string
        }
        Update: {
          id?: number
          task?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_total_royalties: {
        Args: {
          contract_id: string
        }
        Returns: number
      }
      cleanup_incomplete_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cleanup_orphaned_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      notify_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
